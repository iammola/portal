import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { formatApiError } from "utils/api";
import { BaseSubjectModel, GroupSubjectModel, SubjectModel } from "db/models";

import type {
  DeleteSubjectData,
  UpdateSubjectData,
  UpdateSubjectRequestBody,
} from "types/api/subjects";
import type { ApiInternal, ApiInternalResponse } from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";

type Return = ApiInternalResponse<DeleteSubjectData | UpdateSubjectData>;

async function deleteSubject(_id: string) {
  await connect();
  let [result, statusCode]: ApiInternal<DeleteSubjectData> = ["", 0];

  const res = await SubjectModel.deleteOne({ _id });

  [result, statusCode] = [
    {
      success: true,
      data: {
        success: res.acknowledged,
      },
      message: ReasonPhrases.OK,
    },
    StatusCodes.OK,
  ];

  return [result, statusCode] as const;
}

async function updateSubject(_id: string, data: UpdateSubjectRequestBody) {
  await connect();
  let [result, statusCode]: ApiInternal<UpdateSubjectData> = ["", 0];

  const args = [
    _id,
    data,
    {
      fields: "_id",
      runValidators: true,
    },
  ] as const;

  const res = await (data.__type === "base"
    ? BaseSubjectModel.findByIdAndUpdate(...args).lean()
    : GroupSubjectModel.findByIdAndUpdate(...args).lean());

  [result, statusCode] = [
    {
      success: true,
      data: {
        success: !!res?._id,
      },
      message: ReasonPhrases.OK,
    },
    StatusCodes.OK,
  ];

  return [result, statusCode] as const;
}

export default async function handler(
  { body, method = "", query }: NextApiRequest,
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
    if (typeof query.id === "string") {
      if (method === "DELETE")
        [result, statusCode] = await deleteSubject(query.id);
      if (method === "PUT" && typeof body === "string")
        [result, statusCode] = await updateSubject(
          query.id,
          JSON.parse(body) as UpdateSubjectRequestBody
        );
    }
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
