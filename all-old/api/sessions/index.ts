import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { SessionModel } from "db/models";
import { routeWrapper } from "utils/api";

import type { NextApiRequest, NextApiResponse } from "next";

async function getSessions(): API.HandlerResponse<API.Session.GET.AllData> {
  await connect();
  const data = await SessionModel.find({}).populate("termsCount").lean();

  return [{ data, message: ReasonPhrases.OK }, StatusCodes.OK];
}

async function createSession(body: API.Session.POST.Body): API.HandlerResponse<API.Session.POST.Data> {
  await connect();
  const { _id } = await SessionModel.create(body);

  return [{ data: { _id }, message: ReasonPhrases.CREATED }, StatusCodes.CREATED];
}

type D = API.Session.POST.Data | API.Session.GET.AllData;

const handler: API.Handler<D> = async ({ body, method }) => {
  if (method === "POST" && typeof body === "string")
    return await createSession(JSON.parse(body) as API.Session.POST.Body);

  if (method === "GET") return await getSessions();

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper<D>(req, res, handler, ["GET", "POST"]);
