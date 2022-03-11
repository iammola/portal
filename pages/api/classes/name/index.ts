import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { ClassModel } from "db/models";
import { routeWrapper } from "utils/api";

import type { GetClassData } from "types/api/classes";
import type { ApiHandler, MethodResponse } from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";

async function getClass(name: string): MethodResponse<GetClassData> {
  await connect();
  const data = await ClassModel.findByName(name, "long", "-teachers").lean();

  if (data === null) throw new Error(`Class "${name}" not found`);

  return [
    {
      data,
      success: true,
      message: ReasonPhrases.OK,
    },
    StatusCodes.OK,
  ];
}

const handler: ApiHandler<GetClassData> = async ({ method, query }) => {
  if (method === "GET" && typeof query.long === "string") return await getClass(query.long);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<GetClassData>(req, res, handler, ["GET"]);
