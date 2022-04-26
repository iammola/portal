import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { SessionModel } from "db/models";
import { routeWrapper, NotFoundError } from "utils/api";

import type { NextApiRequest, NextApiResponse } from "next";

async function getSessionTerms(id: string): API.HandlerResponse<API.Session.GET.Terms> {
  await connect();
  const data = await SessionModel.findById(id, "terms").populate("terms").lean<API.Session.GET.Terms>();

  if (data === null) throw new NotFoundError("Session not found");

  return [{ data, message: ReasonPhrases.OK }, StatusCodes.OK];
}

const handler: API.Handler<API.Session.GET.Terms> = async ({ method, query }) => {
  if (method === "GET" && typeof query.id === "string") return await getSessionTerms(query.id);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<API.Session.GET.Terms>(req, res, handler, ["GET"]);
