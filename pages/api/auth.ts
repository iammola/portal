import { randomBytes } from "crypto";

import { exportSPKI, generateKeyPair, SignJWT } from "jose";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper } from "utils/api";
import { comparePassword, JWT_ALG, JWT_COOKIE } from "utils";
import { ParentModel, StudentModel, TeacherModel } from "db/models";

import type { ApiHandler } from "types/api";
import type { AuthData, AuthUser } from "types/api/auth";
import type { NextApiRequest, NextApiResponse } from "next";

async function getUser({ level, password, username }: AuthUser) {
  await connect();

  if (!username) throw new Error("Username required");

  const args = [
    username,
    "password",
    {
      populate: "password",
      lean: { virtuals: ["password"] },
    },
  ] as const;

  const user = await (level === "teacher"
    ? TeacherModel.findByUsername(...args)
    : level === "parent"
    ? ParentModel.findByUsername(...args)
    : StudentModel.findByUsername(...args));

  if (user === null) throw new Error("User not found");

  if (!comparePassword(password, user.password)) throw new Error("Invalid password");

  const { privateKey, publicKey } = await generateKeyPair(JWT_ALG);

  const token = await new SignJWT({})
    .setJti(randomBytes(32).toString("hex"))
    .setExpirationTime("1 day")
    .setIssuedAt()
    .setProtectedHeader({
      typ: "JWT",
      alg: JWT_ALG,
    })
    .sign(privateKey);

  return { token, publicKey };
}

const handler: ApiHandler<AuthData> = async (req, res) => {
  if (typeof req.body !== "string" || !req.body) throw new Error("Invalid Request Body");

  const { publicKey, token } = await getUser(JSON.parse(req.body) as AuthUser);

  const expiresIn = 60 * 60 * 24;
  res.cookie(JWT_COOKIE, await exportSPKI(publicKey), {
    httpOnly: true,
    maxAge: expiresIn,
  });

  return [
    {
      success: true,
      data: { token, expiresIn },
      message: ReasonPhrases.OK,
    },
    StatusCodes.OK,
  ];
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<AuthData>(req, res, handler, ["POST"]);
