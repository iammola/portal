import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper, NotFoundError } from "api";
import { ParentModel, StudentModel, TeacherModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<API.User.GET.Data> = async (req) => {
  await connect();

  const { username } = req.query;

  if (req.method === "GET" && typeof username === "string" && /^@/.test(username)) return GETUser(username);

  return null;
};

async function GETUser(username: string): API.HandlerResponse<API.User.GET.Data> {
  const args = [username, "name.full name.initials images.avatar"] as const;

  const result = await Promise.all([
    StudentModel.findByUsername(...args).lean(),
    TeacherModel.findByUsername(...args).lean(),
    ParentModel.findByUsername(...args).lean(),
  ]);

  const user = result.filter(Boolean)[0];
  if (user == null) throw new NotFoundError("A user with the specified username does not exist");

  return [{ data: user, message: ReasonPhrases.OK }, StatusCodes.OK];
}

export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["GET"]);
