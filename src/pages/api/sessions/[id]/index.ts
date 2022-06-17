import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { SessionModel } from "db/models";
import { NotFoundError, routeWrapper } from "api/server";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<API.Session.GET.Data> = async (req) => {
  if (req.method === "GET") return GET(req.query.id);

  return null;
};

async function GET(id: unknown): API.HandlerResponse<API.Session.GET.Data> {
  const [current, data] = await Promise.all([
    SessionModel.findCurrent("_id"),
    SessionModel.findById(id)
      .populate<Pick<Schemas.Session.Virtuals, "termsCount">>("termsCount")
      .lean({ virtuals: ["termsCount"] }),
  ]);

  if (data == null) throw new NotFoundError("Session not found");

  return [{ data: { ...data, current: current !== null }, message: ReasonPhrases.OK }, StatusCodes.OK];
}

export default (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["GET"]);
