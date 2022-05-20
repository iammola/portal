import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper } from "api";
import { SubjectModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<API.Class.GET.Subjects> = async (req) => {
  await connect();
  if (req.method === "GET") return GET(req.query.id);

  return null;
};

async function GET(id: unknown): API.HandlerResponse<API.Class.GET.Subjects> {
  const data = await SubjectModel.find({ class: id }, { teachers: 0, "divisions.teachers": 0 })
    .sort({ order: "asc" })
    .lean<API.Class.GET.Subjects>({ getters: true });

  return [{ data, message: ReasonPhrases.OK }, StatusCodes.OK];
}

export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["GET"]);
