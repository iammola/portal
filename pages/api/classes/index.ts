import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { ClassModel } from "db/models";
import { routeWrapper } from "utils/api";

import type {
  GetClassesData,
  CreateClassData,
  CreateClassRequestBody as CreateBody,
} from "types/api/classes";
import type { ApiHandler, MethodResponse } from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";

async function createClass(data: CreateBody): MethodResponse<CreateClassData> {
  await connect();
  const { _id, createdAt } = await ClassModel.create(data);

  return [
    {
      success: true,
      data: { _id, createdAt },
      message: ReasonPhrases.OK,
    },
    StatusCodes.OK,
  ];
}

async function getClasses(field: string): MethodResponse<GetClassesData> {
  await connect();
  const data = await ClassModel.find({}, field);

  return [
    {
      data,
      success: true,
      message: ReasonPhrases.OK,
    },
    StatusCodes.OK,
  ];
}

type D = CreateClassData | GetClassesData;

const handler: ApiHandler<D> = async ({ body, method, query }) => {
  if (method === "POST" && typeof body === "string")
    return await createClass(JSON.parse(body) as CreateBody);

  if (method === "GET" && typeof query.field === "string")
    return await getClasses(query.field);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<D>(req, res, handler, ["POST", "GET"]);
