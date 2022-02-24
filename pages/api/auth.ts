import * as jose from "jose";
import { serialize } from "cookie";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { formatApiError } from "utils/api";
import { comparePassword, JWT_ALG, JWT_COOKIE } from "utils/password";
import { ParentModel, StudentModel, TeacherModel } from "db/models";

import type { ApiInternalResponse } from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";

type Return = ApiInternalResponse<AuthData>;

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

export default async function handler(
  { body, method = "" }: NextApiRequest,
  res: NextApiResponse<Return[0]>
) {
  const allow = ["DELETE"];
  let [result, statusCode]: Return = [
    {
      success: false,
      error: ReasonPhrases.METHOD_NOT_ALLOWED,
      message: ReasonPhrases.METHOD_NOT_ALLOWED,
    },
    StatusCodes.METHOD_NOT_ALLOWED,
  ];

  try {
    if (method === "POST" && typeof body === "string") {
      const { publicKey, token } = await getUser(JSON.parse(body) as AuthUser);
      res.setHeader(
        "Set-Cookie",
        serialize(JWT_COOKIE, await jose.exportSPKI(publicKey), {
          httpOnly: true,
          maxAge: 60 * 60 * 24,
        })
      );
      [result, statusCode] = [
        {
          success: true,
          data: { token },
          message: ReasonPhrases.OK,
        },
        StatusCodes.OK,
      ];
    }
  } catch (error) {
    [result, statusCode] = [
      {
        success: false,
        error: formatApiError(error),
        message: ReasonPhrases.BAD_REQUEST,
      },
      StatusCodes.BAD_REQUEST,
    ];
  }

  res.setHeader("Allow", allow).status(statusCode).json(result);
}

type AuthUser = {
  level: string;
  password: string;
  username?: string;
  schoolMail?: string;
};

type AuthData = {
  token: string;
};
