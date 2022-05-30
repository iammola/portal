import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper } from "api";
import { SessionModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<API.Session.GET.AllData> = async (req) => {
  await connect();
  if (req.method === "GET") return GET();

  return null;
};

async function GET(): API.HandlerResponse<API.Session.GET.AllData> {
  const [current, data] = await Promise.all([
    SessionModel.findCurrent("_id").lean(),
    SessionModel.find({})
      .populate<Pick<Schemas.Session.Virtuals, "termsCount">>("termsCount")
      .lean({ virtuals: ["termsCount"] }),
  ]);

  return [{ data: { current, data }, message: ReasonPhrases.OK }, StatusCodes.OK];
}

export default (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["GET"]);
