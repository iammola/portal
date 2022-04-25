import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { SessionModel, TermModel } from "db/models";
import { routeWrapper, NotFoundError } from "utils/api";

import type { NextApiRequest, NextApiResponse } from "next";

async function getTerms(): API.HandlerResponse<API.Term.GET.AllData> {
  await connect();
  const terms = await TermModel.find({}).populate<{ session: Schemas.Session.Schema }>("session", "name").lean();

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

  return [{ data, message: ReasonPhrases.OK }, StatusCodes.OK];
}

async function createTerm(body: API.Term.POST.Body): API.HandlerResponse<API.Term.POST.Data> {
  await connect();

  const session = await SessionModel.exists({ _id: body.session }).lean();
  if (session === null) throw new NotFoundError("Session not found");

  const { _id } = await TermModel.create(body);

  return [{ data: { _id }, message: ReasonPhrases.CREATED }, StatusCodes.CREATED];
}

type D = API.Term.GET.AllData | API.Term.POST.Data;

const handler: API.Handler<D> = async ({ body, method }) => {
  if (method === "POST" && typeof body === "string") return await createTerm(JSON.parse(body) as API.Term.POST.Body);

  if (method === "GET") return await getTerms();

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper<D>(req, res, handler, ["POST", "GET"]);
