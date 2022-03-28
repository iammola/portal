import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { SessionModel, TermModel } from "db/models";
import { routeWrapper, NotFoundError } from "utils/api";

import type {
  GetTermsData as GetData,
  CreateTermData as CreateData,
  CreateTermRequestBody as CreateBody,
} from "types/api/terms";
import type { SessionSchema } from "types/schema";
import type { ApiHandler, MethodResponse } from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";

async function getTerms(): MethodResponse<GetData> {
  await connect();
  const terms = await TermModel.find({}).populate<{ session: SessionSchema }>("session", "name").lean();

  const data = terms.map(({ session, ...term }) => ({
    ...term,
    name: {
      short: `${session.name.short} ${term.name.short} Term`,
      long: `${session.name.long} Session - ${term.name.long} Term`,
    },
  }));

  data.sort((a, b) => {
    const nameA = a.name.short.toUpperCase() ?? 0;
    const nameB = b.name.short.toUpperCase() ?? 0;

    return nameA > nameB ? 1 : nameA < nameB ? -1 : 0;
  });

  return [
    {
      data,
      success: true,
      message: ReasonPhrases.OK,
    },
    StatusCodes.OK,
  ];
}

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

type D = GetData | CreateData;

const handler: ApiHandler<D> = async ({ body, method }) => {
  if (method === "POST" && typeof body === "string") return await createTerm(JSON.parse(body) as CreateBody);

  if (method === "GET") return await getTerms();

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper<D>(req, res, handler, ["POST", "GET"]);
