import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { NotFoundError, routeWrapper } from "api/server";
import { ParentModel, StudentModel, StaffModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<API.User.GET.Data> = async (req) => {
  const { username } = req.query;

  if (req.method === "GET" && typeof username === "string" && /^@/.test(username)) return GETUser(username);

  return null;
};

async function GETUser(username: string): API.HandlerResponse<API.User.GET.Data> {
  const args = [username, "name.full name.initials images.avatar __type"] as const;

  const result = await Promise.all([
    StudentModel.findByUsername(...args).lean(),
    StaffModel.findByUsername(...args).lean(),
    ParentModel.findByUsername(...args).lean(),
  ]);

  const levels = ["student", "staff", "parent"];
  const idx = result.findIndex((user) => user !== null);

  const user = result[idx];
  if (user == null) throw new NotFoundError("A user with the specified username does not exist");

  const data = {
    _id: user._id,
    name: user.name.full,
    avatar: user.images?.avatar,
    initials: user.name.initials,
    level: "__type" in user ? `${levels[idx]} (${user.__type})` : levels[idx],
  };

  return [{ data, message: ReasonPhrases.OK }, StatusCodes.OK];
}

export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["GET"]);
