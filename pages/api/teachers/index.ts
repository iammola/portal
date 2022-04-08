import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { createUser } from "utils/user";
import { routeWrapper } from "utils/api";

import type {
  ApiHandler,
  CreateTeacherData as CreateData,
  CreateTeacherRequestBody as CreateBody,
  HandlerResponse,
} from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";

async function createTeacher(body: CreateBody): HandlerResponse<CreateData> {
  const { _id, schoolMail } = await createUser("teacher", body);

  return [
    {
      success: true,
      data: { _id, schoolMail },
      message: ReasonPhrases.CREATED,
    },
    StatusCodes.CREATED,
  ];
}

const handler: ApiHandler<CreateData> = async ({ body, method }) => {
  if (method === "POST" && typeof body === "string") return await createTeacher(JSON.parse(body) as CreateBody);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<CreateData>(req, res, handler, ["POST"]);
