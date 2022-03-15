import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { TermModel } from "db/models";
import { routeWrapper } from "utils/api";

import type { ApiHandler, MethodResponse } from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";
import type { GetTermData as GetData } from "types/api/terms";

async function getCurrentTerm(): MethodResponse<GetData> {
  await connect();

  return [
    {
      success: true,
      message: ReasonPhrases.CREATED,
      data: await TermModel.findCurrent().populate("session").lean(),
    },
    StatusCodes.CREATED,
  ];
}

const handler: ApiHandler<GetData> = async ({ method }) => {
  if (method === "GET") return await getCurrentTerm();

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<GetData>(req, res, handler, ["GET"]);
