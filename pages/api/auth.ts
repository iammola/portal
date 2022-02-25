import * as jose from "jose";
import { serialize } from "cookie";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper } from "utils/api";
import { ParentModel, StudentModel, TeacherModel } from "db/models";
import { comparePassword, JWT_ALG, JWT_COOKIE } from "utils/password";

import type { ApiHandler } from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";

async function getUser({ level, password, ...data }: AuthUser) {
  await connect();

  if (!data.schoolMail && !data.username)
    throw new Error("Username or Password required");

  const args = [data, "password"] as const;
  const user = await (level === "teacher"
    ? TeacherModel.findOne(...args).lean()
    : level === "parent"
    ? ParentModel.findOne(...args).lean()
    : StudentModel.findOne(...args).lean());

  if (user === null) throw new Error("User not found");

  if (!comparePassword(password, user.password))
    throw new Error("Invalid password");

  const { privateKey, publicKey } = await jose.generateKeyPair(JWT_ALG);

  const token = await new jose.SignJWT(data as Record<string, unknown>)
    .setIssuedAt()
    .setExpirationTime(60 * 60 * 24)
    .setProtectedHeader({
      typ: "JWT",
      alg: JWT_ALG,
    })
    .sign(privateKey);

  return { token, publicKey };
}

const handler: ApiHandler<AuthData> = async (req, res) => {
  if (req.method !== "POST" || typeof req.body !== "string") return null;

  const { publicKey, token } = await getUser(JSON.parse(req.body) as AuthUser);

  res.setHeader(
    "Set-Cookie",
    serialize(JWT_COOKIE, await jose.exportSPKI(publicKey), {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    })
  );

  return [
    {
      success: true,
      data: { token },
      message: ReasonPhrases.OK,
    },
    StatusCodes.OK,
  ];
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<AuthData>(req, res, handler, ["POST"]);

type AuthUser = {
  level: string;
  password: string;
  username?: string;
  schoolMail?: string;
};

type AuthData = {
  token: string;
};
