import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { createUser } from "utils/user";
import { routeWrapper } from "utils/api";

import type { CreateParentData as CreateData, CreateParentRequestBody as CreateBody } from "types/api/parents";
import type { ApiHandler, MethodResponse } from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";

async function createParent(body: CreateBody): MethodResponse<CreateData> {
  return [
    {
      success: true,
      message: ReasonPhrases.CREATED,
      data: await createUser("parent", body),
    },
    StatusCodes.CREATED,
  ];
}

const handler: ApiHandler<CreateData> = async ({ body, method }) => {
  if (method === "POST" && typeof body === "string") return await createParent(JSON.parse(body) as CreateBody);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<CreateData>(req, res, handler, ["POST"]);
