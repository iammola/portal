import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { routeWrapper } from "api/server";
import { TeacherStaffModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<API.Teacher.GET.AllData> = async (req) => {
  if (req.method === "GET") return GET();

  return null;
};

async function GET(): API.HandlerResponse<API.Teacher.GET.AllData> {
  const data = await TeacherStaffModel.find({}).lean();

  return [{ data, message: ReasonPhrases.OK }, StatusCodes.OK];
}

export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["GET"]);
