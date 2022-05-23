import { randomBytes } from "crypto";

import { setCookies } from "cookies-next";
import { generateKeyPair, SignJWT, exportSPKI } from "jose";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { comparePassword } from "db/utils";
import { JWT_ALG, JWT_COOKIE_KEY } from "utils";
import { NotFoundError, routeWrapper } from "api";
import { TeacherModel, ParentModel, StudentModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

async function getUser(level: string, username: string) {
  await connect();

  if (level === "student")
    return await StudentModel.findByUsername(username, "password")
      .populate<Schemas.User.Virtuals>("password")
      .lean({ virtuals: ["password"] });

  if (level === "teacher")
    return await TeacherModel.findByUsername(username, "password")
      .populate<Schemas.User.Virtuals>("password")
      .lean({ virtuals: ["password"] });

  if (level === "parent")
    return await ParentModel.findByUsername(username, "password")
      .populate<Schemas.User.Virtuals>("password")
      .lean({ virtuals: ["password"] });
}

const handler: API.Handler<API.Auth.POST.Data> = async (req, res) => {
  if (typeof req.body !== "string" || !req.body) throw new Error("Invalid Request Body");

  const { level, password, remember, username } = JSON.parse(req.body) as API.Auth.POST.Body;
  if (!username) throw new Error("Username required");

  const user = await getUser(level, username);
  if (user == null) throw new NotFoundError("User not found");

  if (!comparePassword(password, user.password)) throw new Error("Invalid password");

  const { privateKey, publicKey } = await generateKeyPair(JWT_ALG);

  const token = await new SignJWT({})
    .setJti(randomBytes(32).toString("hex"))
    .setExpirationTime("7 days")
    .setIssuedAt()
    .setProtectedHeader({ typ: "JWT", alg: JWT_ALG })
    .sign(privateKey);

  const expires = remember ? new Date(Date.now() + 7 * 24 * 60 * 60) : undefined;
  const options = { req, res, expires, secure: true, httpOnly: true, sameSite: true };

  setCookies(JWT_COOKIE_KEY, await exportSPKI(publicKey), options);

  return [{ data: { token, expires, _id: user._id }, message: ReasonPhrases.OK }, StatusCodes.OK];
};

export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<API.Auth.POST.Data>(req, res, handler, ["POST"]);
