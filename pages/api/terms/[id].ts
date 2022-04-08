import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { TermModel } from "db/models";
import { NotFoundError, routeWrapper } from "utils/api";

import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiHandler, GetTermData as GetData, HandlerResponse } from "types/api";

async function getTerm(id: string): HandlerResponse<GetData> {
  await connect();

  const data = await TermModel.findById(id).populate<{ session: GetData["session"] }>("session").lean();
  if (!data) throw new NotFoundError("Term not found");

  return [{ data, message: ReasonPhrases.OK }, StatusCodes.OK];
}

const handler: ApiHandler<GetData> = async ({ method, query }) => {
  if (method === "GET" && typeof query.id === "string") return await getTerm(query.id);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper<GetData>(req, res, handler, ["GET"]);
