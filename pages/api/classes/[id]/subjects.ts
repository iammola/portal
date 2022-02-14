import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { formatApiError } from "utils/api";

import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiInternal, ApiInternalResponse } from "types/api";
import type {
  CreateSubjectData,
  CreateSubjectRequestBody,
} from "types/api/subjects";

type Return = ApiInternalResponse<CreateSubjectData>;

async function createSubject(data: CreateSubjectRequestBody, classID: string) {
  await connect();
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
