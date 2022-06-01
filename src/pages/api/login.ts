import { randomBytes } from "crypto";

import { add } from "date-fns";
import { setCookies } from "cookies-next";
import { generateKeyPair, SignJWT, exportSPKI } from "jose";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { comparePassword } from "db/utils";
import { NotFoundError, routeWrapper } from "api";
import { ParentModel, SettingsModel, StaffModel, StudentModel } from "db/models";
import { JWT_ALG, JWT_COOKIE_KEY, USER_ID_COOKIE, USER_LEVEL_COOKIE } from "utils";

import type { NextApiRequest, NextApiResponse } from "next";

async function getUser(level: string, username: string): Promise<User | null | undefined> {
  if (level === "student")
    return await StudentModel.findByUsername(username, "password")
      .populate<Schemas.User.Virtuals>("password")
      .lean({ virtuals: ["password"] });

  if (level === "staff")
    return await StaffModel.findByUsername(username, "password __type")
      .populate<Schemas.User.Virtuals>("password")
      .lean({ virtuals: ["password"] });

  if (level === "parent")
    return await ParentModel.findByUsername(username, "password")
      .populate<Schemas.User.Virtuals>("password")
      .lean({ virtuals: ["password"] });
}

const handler: API.Handler<API.Auth.POST.Data> = async (req, res) => {
  await connect();

  // A specific type of privilege will be able to bypass this
  const settings = await SettingsModel.findOne({}, "locked").lean();
  if (settings?.locked !== false) throw new Error("Could not complete request");

  const { level, password, remember, username } = req.body as API.Auth.POST.Body;
  if (!username) throw new Error("Username required");

  const user = await getUser(level, username);
  if (user === null) throw new NotFoundError("User not found");
  if (user === undefined) throw new Error("Invalid user level");

  if (!comparePassword(password, user.password)) throw new Error("Invalid password");

  const { privateKey, publicKey } = await generateKeyPair(JWT_ALG);

  const token = await new SignJWT({})
    .setJti(randomBytes(32).toString("hex"))
    .setExpirationTime("7 days")
    .setIssuedAt()
    .setProtectedHeader({ typ: "JWT", alg: JWT_ALG })
    .sign(privateKey);

  const expires = remember ? add(new Date(), { days: 7 }) : undefined;
  const options = { req, res, expires, secure: true, sameSite: true };

  setCookies(JWT_COOKIE_KEY, await exportSPKI(publicKey), { ...options, httpOnly: true });
  /* Client Cookies */
  setCookies(USER_ID_COOKIE, user._id, options);
  setCookies(USER_LEVEL_COOKIE, level !== "staff" ? level : `${level}-${user.__type ?? ""}`, options);

  return [
    {
      message: ReasonPhrases.OK,
      data: { token, expires },
    },
    StatusCodes.OK,
  ];
};

type User = { _id: Schemas.ObjectId; __type?: string } & Pick<Schemas.User.Virtuals, "password">;

export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["POST"]);
