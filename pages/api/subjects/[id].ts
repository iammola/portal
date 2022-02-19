import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { formatApiError } from "utils/api";

import type { DeleteSubjectData } from "types/api/subjects";
import type { ApiInternal, ApiInternalResponse } from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";

type Return = ApiInternalResponse<DeleteSubjectData>;

async function deleteSubject(_id: string) {
  await connect();
}

export default async function handler(
  { method = "", query }: NextApiRequest,
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
    if (method === "DELETE" && typeof query.id === "string")
      await deleteSubject(query.id);
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
