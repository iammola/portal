import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { ClassModel } from "db/models";
import { routeWrapper, NotFoundError } from "utils/api";

import type { NextApiRequest, NextApiResponse } from "next";

async function getClass(id: string): API.HandlerResponse<API.Class.GET.Data> {
  await connect();
  const data = await ClassModel.findById(id).populate<{ subjectsCount: number }>("subjectsCount").lean();

  if (data === null) throw new NotFoundError("Class not found");

  return [{ data, message: ReasonPhrases.OK }, StatusCodes.OK];
}

const handler: API.Handler<API.Class.GET.Data> = async ({ method, query }) => {
  if (method === "GET") return await getClass(query.id as string);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<API.Class.GET.Data>(req, res, handler, ["GET"]);
