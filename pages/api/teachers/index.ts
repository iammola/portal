import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { createUser } from "utils/user";
import { routeWrapper } from "utils/api";

import type {
  CreateTeacherData as CreateData,
  CreateTeacherRequestBody as CreateBody,
} from "types/api/teachers";
import type { ApiHandler, MethodResponse } from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";

async function createTeacher(body: CreateBody): MethodResponse<CreateData> {
  return [
    {
      success: true,
      message: ReasonPhrases.CREATED,
      data: await createUser("teacher", body),
    },
    StatusCodes.CREATED,
  ];
}

const handler: ApiHandler<CreateData> = async ({ body, method }) => {
  if (method === "POST" && typeof body === "string")
    return await createTeacher(JSON.parse(body) as CreateBody);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<CreateData>(req, res, handler, ["POST"]);
