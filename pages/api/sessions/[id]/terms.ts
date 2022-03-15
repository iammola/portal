import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { SessionModel } from "db/models";
import { routeWrapper, NotFoundError } from "utils/api";

import type { ApiHandler, MethodResponse } from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";
import type { GetSessionTermsData as GetData } from "types/api/sessions";

async function getSessionTerms(id: string): MethodResponse<GetData> {
  await connect();
  const data = await SessionModel.findById(id, "terms").populate("terms").lean<GetData>();

  if (data === null) throw new NotFoundError("Session not found");

  return [
    {
      data,
      success: true,
      message: ReasonPhrases.CREATED,
    },
    StatusCodes.CREATED,
  ];
}

const handler: ApiHandler<GetData> = async ({ method, query }) => {
  if (method === "GET" && typeof query.id === "string") return await getSessionTerms(query.id);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<GetData>(req, res, handler, ["GET"]);
