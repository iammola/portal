import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { SessionModel, TermModel } from "db/models";
import { routeWrapper, NotFoundError } from "utils/api";

import type { CreateTermData as CreateData, CreateTermRequestBody as CreateBody } from "types/api/terms";
import type { ApiHandler, MethodResponse } from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";

async function createTerm(body: CreateBody): MethodResponse<CreateData> {
  await connect();

  const session = await SessionModel.exists({ _id: body.session }).lean();
  if (session === null) throw new NotFoundError("Session not found");

  const { _id } = await TermModel.create(body);

  return [
    {
      data: { _id },
      success: true,
      message: ReasonPhrases.CREATED,
    },
    StatusCodes.CREATED,
  ];
}

const handler: ApiHandler<CreateData> = async ({ body, method }) => {
  if (method === "POST" && typeof body === "string") return await createTerm(JSON.parse(body) as CreateBody);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<CreateData>(req, res, handler, ["POST"]);
