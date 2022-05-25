import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper } from "api";
import { SessionModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<API.Session.POST.Data | API.Session.GET.AllData> = async (req) => {
  await connect();
  if (req.method === "GET") return GET();
  if (req.method === "POST") return POST(req.body);

  return null;
};

async function GET(): API.HandlerResponse<API.Session.GET.AllData> {
  const data = await SessionModel.find({})
    .populate<Schemas.Session.Virtuals>(["terms", "termsCount"])
    .lean({ virtuals: true });

  return [{ data, message: ReasonPhrases.OK }, StatusCodes.OK];
}

async function POST(body: unknown): API.HandlerResponse<API.Session.POST.Data> {
  const { name } = JSON.parse(body as string) as API.Session.POST.Body;

  const checks = await Promise.all([
    SessionModel.exists({ "name.long": name.long }),
    SessionModel.exists({ "name.short": name.short }),
  ]);

  if (checks[0] != null) throw new Error(`A session with name ${name.long} already exists`);
  if (checks[1] != null) throw new Error(`A session with alias ${name.short} already exists`);

  const { _id } = await SessionModel.create({ name });

  return [{ data: { _id }, message: ReasonPhrases.CREATED }, StatusCodes.CREATED];
}

export default (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["POST", "GET"]);
