import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { TermModel } from "db/models";
import { routeWrapper } from "utils/api";

import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiHandler, GetTermData as GetData, HandlerResponse } from "types/api";

async function getCurrentTerm(): HandlerResponse<GetData> {
  await connect();
  const data = await TermModel.findCurrent().populate("session").lean();

  return [{ data, message: ReasonPhrases.OK }, StatusCodes.OK];
}

const handler: ApiHandler<GetData> = async ({ method }) => {
  if (method === "GET") return await getCurrentTerm();

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper<GetData>(req, res, handler, ["GET"]);
