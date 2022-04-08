import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { SessionModel } from "db/models";
import { routeWrapper } from "utils/api";

import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiHandler, GetSessionData as GetData, MethodResponse } from "types/api";

async function getCurrentSession(): MethodResponse<GetData> {
  await connect();

  return [
    {
      success: true,
      message: ReasonPhrases.OK,
      data: await SessionModel.findCurrent().lean(),
    },
    StatusCodes.OK,
  ];
}

const handler: ApiHandler<GetData> = async ({ method }) => {
  if (method === "GET") return await getCurrentSession();

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper<GetData>(req, res, handler, ["GET"]);
