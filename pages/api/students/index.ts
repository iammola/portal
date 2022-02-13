import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { formatApiError } from "utils/api";
import { generateSchoolMail } from "utils/email";
import { ParentModel, StudentModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiInternal, ApiInternalResponse } from "types/api";
import type {
  CreateStudentData,
  CreateStudentRequestBody,
} from "types/api/students";

type Return = ApiInternalResponse<CreateStudentData>;

async function createStudent({
  academic: _,
  guardians,
  ...data
}: CreateStudentRequestBody) {
  await connect();
  let [result, statusCode]: ApiInternal<CreateStudentData> = ["", 0];

  const parents = await ParentModel.find(
    {
      schoolMail: guardians.map((g) => g.mail),
    },
    "schoolMail"
  ).lean();

  const { _id, schoolMail } = await StudentModel.create({
    ...data,
    schoolMail: generateSchoolMail(data.name.username),
    guardians: parents.map((p) => ({
      guardian: p._id,
      relation: guardians.find((g) => g.mail === p.schoolMail)?.relation,
    })),
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
      await createStudent(JSON.parse(body) as CreateStudentRequestBody);
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
