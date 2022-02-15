import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { TeacherModel } from "db/models";
import { formatApiError } from "utils/api";
import { generateSchoolMail } from "utils/email";

import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiInternal, ApiInternalResponse } from "types/api";
import type {
  CreateTeacherData,
  CreateTeacherRequestBody,
} from "types/api/teachers";

type Return = ApiInternalResponse<CreateTeacherData>;

async function createTeacher({ image: _i, ...data }: CreateTeacherRequestBody) {
  await connect();
  let [result, statusCode]: ApiInternal<CreateTeacherData> = ["", 0];

  const { _id, schoolMail } = await TeacherModel.create({
    ...data,
    schoolMail: generateSchoolMail(data.name.username),
  });

  [result, statusCode] = [
    {
      success: true,
      data: { _id, schoolMail },
      message: ReasonPhrases.OK,
    },
    StatusCodes.OK,
  ];

  return [result, statusCode] as const;
}

export default async function handler(
  { body, method = "" }: NextApiRequest,
  res: NextApiResponse<Return[0]>
) {
  const allow = ["POST"];
  let [result, statusCode]: Return = [
    {
      success: false,
      error: ReasonPhrases.METHOD_NOT_ALLOWED,
      message: ReasonPhrases.METHOD_NOT_ALLOWED,
    },
    StatusCodes.METHOD_NOT_ALLOWED,
  ];

  try {
    if (method === "POST" && typeof body === "string")
      await createTeacher(JSON.parse(body) as CreateTeacherRequestBody);
  } catch (error: any) {
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