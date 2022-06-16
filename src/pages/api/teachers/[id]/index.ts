import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { TeacherStaffModel } from "db/models";
import { USER_ID_COOKIE } from "utils/constants";
import { NotFoundError, routeWrapper } from "api/server";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<API.Teacher.GET.Data> = async (req) => {
  await connect();

  if (req.method === "GET") return GET(req.query.id as string, req.cookies[USER_ID_COOKIE]);

  return null;
};

async function GET(id: string, user: string): API.HandlerResponse<API.Teacher.GET.Data> {
  if (id === "me") id = user;
  const data = await TeacherStaffModel.findById(id).lean();

  if (data === null) throw new NotFoundError("Teacher does not exist");

  return [{ data, message: ReasonPhrases.OK }, StatusCodes.OK];
}

export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["GET"]);
