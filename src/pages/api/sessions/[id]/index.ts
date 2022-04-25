import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { SessionModel } from "db/models";
import { NotFoundError, routeWrapper } from "utils/api";

import type { NextApiRequest, NextApiResponse } from "next";

async function getSession(id: string): API.HandlerResponse<API.Session.GET.Data> {
  await connect();

  const data = await (id === "current" ? SessionModel.findCurrent() : SessionModel.findById(id)).lean();
  if (!data) throw new NotFoundError("Session not found");

  return [{ data, message: ReasonPhrases.OK }, StatusCodes.OK];
}

const handler: API.Handler<API.Session.GET.Data> = async ({ method, query }) => {
  if (method === "GET" && typeof query.id === "string") return await getSession(query.id);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<API.Session.GET.Data>(req, res, handler, ["GET"]);
