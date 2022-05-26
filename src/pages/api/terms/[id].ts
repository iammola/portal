import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { NotFoundError, routeWrapper } from "api";
import { TermModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<object> = async (req) => {
  await connect();
  if (req.method === "GET") return GET(req.query.id);

  return null;
};

async function GET(id: unknown): API.HandlerResponse<API.Term.GET.Data> {
  const data = await TermModel.findById(id)
    .populate<{ session: Pick<Schemas.Session.Record, "name"> }>("session", "name")
    .lean();

  if (data == null) throw new NotFoundError("Term not found");

  return [{ data, message: ReasonPhrases.OK }, StatusCodes.OK];
}

export default (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["GET"]);
