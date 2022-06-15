import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { TeacherStaffModel } from "db/models";
import { NotFoundError, routeWrapper } from "api/server";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<API.Teacher.GET.Data> = async (req) => {
  await connect();

  if (req.method === "GET") return GET(req.query.id as string);

  return null;
};

async function GET(id: string): API.HandlerResponse<API.Teacher.GET.Data> {
  const data = await TeacherStaffModel.findById(id).lean();

  if (data === null) throw new NotFoundError("Teacher does not exist");

  return [{ data, message: ReasonPhrases.OK }, StatusCodes.OK];
}

export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["GET"]);
