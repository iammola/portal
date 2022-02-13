import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { ParentModel } from "db/models";
import { formatApiError } from "utils/api";
import { generateSchoolMail } from "utils/email";

import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiInternal, ApiInternalResponse } from "types/api";
import type {
  CreateParentData,
  CreateParentRequestBody,
} from "types/api/parents";

type Return = ApiInternalResponse<CreateParentData>;

async function createParent({ image: _i, ...data }: CreateParentRequestBody) {
  await connect();
  let [result, statusCode]: ApiInternal<CreateParentData> = ["", 0];

  const { _id, schoolMail } = await ParentModel.create({
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
      await createParent(JSON.parse(body) as CreateParentRequestBody);
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
