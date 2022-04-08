import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { SessionModel } from "db/models";
import { routeWrapper } from "utils/api";

import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiHandler, GetSessionData as GetData, HandlerResponse } from "types/api";

async function getSession(id: string): HandlerResponse<GetData> {
  await connect();
  const data = await SessionModel.findById(id).lean();

  return [{ data, message: ReasonPhrases.OK }, StatusCodes.OK];
}

const handler: ApiHandler<GetData> = async ({ method, query }) => {
  if (method === "GET" && typeof query.id === "string") return await getSession(query.id);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper<GetData>(req, res, handler, ["GET"]);
