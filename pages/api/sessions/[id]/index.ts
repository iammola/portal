import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { SessionModel } from "db/models";
import { routeWrapper } from "utils/api";

import type { ApiHandler, MethodResponse } from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";
import type { GetSessionData as GetData } from "types/api/sessions";

async function getSession(id: string): MethodResponse<GetData> {
  await connect();

  return [
    {
      success: true,
      message: ReasonPhrases.OK,
      data: await SessionModel.findById(id).lean(),
    },
    StatusCodes.OK,
  ];
}

const handler: ApiHandler<GetData> = async ({ method, query }) => {
  if (method === "GET" && typeof query.id === "string") return await getSession(query.id);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper<GetData>(req, res, handler, ["GET"]);
