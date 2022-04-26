import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { TermModel } from "db/models";
import { NotFoundError, routeWrapper } from "utils/api";

import type { NextApiRequest, NextApiResponse } from "next";

async function getTerm(id: string): API.HandlerResponse<API.Term.GET.Data> {
  await connect();

  const data = await (id === "current" ? TermModel.findCurrent() : TermModel.findById(id))
    .populate<{ session: API.Term.GET.Data["session"] }>("session")
    .lean();
  if (!data) throw new NotFoundError("Term not found");

  return [{ data, message: ReasonPhrases.OK }, StatusCodes.OK];
}

const handler: API.Handler<API.Term.GET.Data> = async ({ method, query }) => {
  if (method === "GET" && typeof query.id === "string") return await getTerm(query.id);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<API.Term.GET.Data>(req, res, handler, ["GET"]);
