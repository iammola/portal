import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { SessionModel } from "db/models";
import { routeWrapper } from "utils/api";

import type {
  ApiHandler,
  GetSessionsData as GetData,
  CreateSessionData as CreateData,
  CreateSessionRequestBody as CreateBody,
  MethodResponse,
} from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";

async function getSessions(): MethodResponse<GetData> {
  await connect();
  const data = await SessionModel.find({}).populate("termsCount").lean();

  return [
    {
      data,
      success: true,
      message: ReasonPhrases.OK,
    },
    StatusCodes.OK,
  ];
}

async function createSession(body: CreateBody): MethodResponse<CreateData> {
  await connect();
  const { _id } = await SessionModel.create(body);

  return [
    {
      data: { _id },
      success: true,
      message: ReasonPhrases.CREATED,
    },
    StatusCodes.CREATED,
  ];
}

type D = CreateData | GetData;

const handler: ApiHandler<D> = async ({ body, method }) => {
  if (method === "POST" && typeof body === "string") return await createSession(JSON.parse(body) as CreateBody);

  if (method === "GET") return await getSessions();

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper<D>(req, res, handler, ["GET", "POST"]);
