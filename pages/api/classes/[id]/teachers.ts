import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { ClassModel } from "db/models";
import { NotFoundError, routeWrapper } from "utils/api";

import type { MethodResponse, ApiHandler } from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";
import type { GetClassTeachersData as GetData } from "types/api/classes";

async function getTeachers(classID: string, proj: any): MethodResponse<GetData> {
  await connect();
  const data = await ClassModel.getTeachers(classID, proj).lean();

  if (data === null) throw new NotFoundError("Class not found");

  return [
    {
      data,
      success: true,
      message: ReasonPhrases.CREATED,
    },
    StatusCodes.CREATED,
  ];
}

const handler: ApiHandler<GetData> = async ({ query, method }) => {
  if (method === "GET")
    return await getTeachers(query.id as string, (query.projection as string).replaceAll(",", ""));

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<GetData>(req, res, handler, ["GET"]);
