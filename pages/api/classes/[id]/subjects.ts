import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { formatApiError } from "utils/api";
import { BaseSubjectModel, GroupSubjectModel, TeacherModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiInternal, ApiInternalResponse } from "types/api";
import type {
  CreateSubjectData,
  CreateSubjectRequestBody,
} from "types/api/subjects";

type Return = ApiInternalResponse<CreateSubjectData>;

async function createSubject(data: CreateSubjectRequestBody, classID: string) {
  await connect();
  let [result, statusCode]: ApiInternal<CreateSubjectData> = ["", 0];

  const teachers = await TeacherModel.find(
    {
      schoolMail:
        data.__type === "base"
          ? data.teachers
          : data.divisions.map((d) => d.teachers).flat(),
    },
    "schoolMail"
  ).lean();

  const { _id } =
    data.__type === "base"
      ? await BaseSubjectModel.create({
          ...data,
          class: classID,
          teachers: teachers.map((t) => t._id),
        })
      : await GroupSubjectModel.create({
          ...data,
          class: classID,
          divisions: data.divisions.map((div) => ({
            ...div,
            teachers: div.teachers
              .map((t) => teachers.find((d) => d.schoolMail === t)?._id)
              .filter(Boolean),
          })),
        });

  [result, statusCode] = [
    {
      success: true,
      data: { _id },
      message: ReasonPhrases.OK,
    },
    StatusCodes.OK,
  ];

  return [result, statusCode] as const;
}

export default async function handler(
  { body, query, method = "" }: NextApiRequest,
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
      await createSubject(
        JSON.parse(body) as CreateSubjectRequestBody,
        query.id as string
      );
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
