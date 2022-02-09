import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { ClassModel } from "db/models";
import { formatApiError } from "utils/api";

import type {
  GetClassesData,
  CreateClassData,
  CreateClassRequestBody,
} from "types/api/classes";
import type { ApiInternal, ApiInternalResponse } from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";

type Return = ApiInternalResponse<CreateClassData | GetClassesData>;

async function createClass(data: CreateClassRequestBody) {
  let [result, statusCode]: ApiInternal<CreateClassData> = ["", 0];

  await connect();
  const { _id, createdAt } = await ClassModel.create(data);

  [result, statusCode] = [
    {
      success: true,
      data: { _id, createdAt },
      message: ReasonPhrases.OK,
    },
    StatusCodes.OK,
  ];

  return [result, statusCode] as const;
}

async function getClasses(field: string) {
  let [result, statusCode]: ApiInternal<GetClassesData> = ["", 0];

  await connect();
  const data = await ClassModel.find({}, field);

  [result, statusCode] = [
    {
      data,
      success: true,
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
  const allow = ["POST", "GET"];
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
      [result, statusCode] = await createClass(
        JSON.parse(body) as CreateClassRequestBody
      );

    if (method === "GET" && typeof query.field === "string")
      [result, statusCode] = await getClasses(query.field);
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
