import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { SubjectModel } from "db/models";
import { formatApiError } from "utils/api";

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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const res = await SubjectModel.findByIdAndUpdate(_id, data, {
    fields: "_id",
    runValidators: true,
  }).lean();

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
      if (method === "DELETE") await deleteSubject(query.id);
      if (method === "PUT" && typeof body === "string")
        await updateSubject(
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
