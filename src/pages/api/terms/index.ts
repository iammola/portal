import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper } from "api";
import { TermModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<object> = async (req) => {
  await connect();
  if (req.method === "GET") return GET();

  return null;
};

async function GET(): API.HandlerResponse<API.Term.GET.AllData> {
  const terms = await TermModel.find({})
    .sort({ start: 1 })
    .populate<{ session: Pick<Schemas.Session.Record, "name"> }>("session", "name")
    .lean();

  const data = terms.reduce((acc, { session, ...cur }) => {
    const key = session.name.long;

    return {
      ...acc,
      [key]: {
        ...(acc[key] ?? { session }),
        terms: [...(acc[key]?.terms ?? []), cur],
      },
    };
  }, {} as Record<string, API.Term.GET.AllData[number]>);

  return [{ data: Object.values(data), message: ReasonPhrases.OK }, StatusCodes.OK];
}

export default (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["GET"]);
