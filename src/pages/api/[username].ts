import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper, NotFoundError } from "api";
import { ParentModel, StudentModel, StaffModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<API.User.GET.Data> = async (req) => {
  await connect();

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
  const user = result.reduce<(API.User.GET.Data & { __type?: string }) | null>((acc, user, idx) => {
    if (user == null) return acc;

    const { __type, ...cur } = user as unknown as API.User.GET.Data & { __type?: string };
    return {
      ...cur,
      level: __type ? `Staff (${__type})` : levels[idx],
    };
  }, null);

  if (user == null) throw new NotFoundError("A user with the specified username does not exist");

  return [{ data: user, message: ReasonPhrases.OK }, StatusCodes.OK];
}

export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["GET"]);
