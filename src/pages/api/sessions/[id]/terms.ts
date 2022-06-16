import { startSession } from "mongoose";
import { add, isAfter, lightFormat } from "date-fns";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { NotFoundError, routeWrapper } from "api/server";
import { SessionModel, TermModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<API.Session.POST.Terms.Data | API.Session.GET.Terms> = async (req) => {
  if (req.method === "GET") return GET(req.query.id);
  if (req.method === "POST") return POST(req.query.id, req.body as API.Session.POST.Terms.Body);

  return null;
};

async function GET(sessionId: unknown): API.HandlerResponse<API.Session.GET.Terms> {
  const data = await SessionModel.findById(sessionId, "terms")
    .populate<Pick<Schemas.Session.Virtuals, "terms">>("terms")
    .lean();

  if (data === null) throw new NotFoundError("Session does not exist");

  return [{ data, message: ReasonPhrases.OK }, StatusCodes.OK];
}

async function POST(
  sessionId: unknown,
  { end, name, start, ...body }: API.Session.POST.Terms.Body
): API.HandlerResponse<API.Session.POST.Terms.Data> {
  if (sessionId === "new") {
    if (!body.session) throw new Error("Session details required");

    const { name } = body.session;
    const checks = await Promise.all([
      SessionModel.exists({ "name.long": name.long }),
      SessionModel.exists({ "name.short": name.short }),
    ]);

    if (checks[0]) throw new Error(`A session with name ${name.long} already exists`);
    if (checks[1]) throw new Error(`A session with alias ${name.short} already exists`);
  } else {
    const checks = await Promise.all([
      TermModel.exists({ session: sessionId, "name.long": name.long }),
      TermModel.exists({ session: sessionId, "name.short": name.short }),
    ]);

    if (checks[0]) throw new Error(`A term with name ${name.long} in the specified session already exists`);
    if (checks[1]) throw new Error(`A term with alias ${name.short} in the specified session already exists`);
  }

  if (!start || !end) throw new Error("Start and End dates are required");
  if (isAfter(add(new Date(start), { weeks: 1 }), new Date(end)))
    throw new Error("End Date must be at least a week after the specified start");

  const checks = await Promise.all([
    await TermModel.exists({ start }),
    await TermModel.exists({ end }),
    await TermModel.exists({ end: start }),
    await TermModel.exists({ start: end }),
    await TermModel.exists({
      $or: [
        { start: { $lte: start }, end: { $gte: start } },
        { start: { $lte: end }, end: { $gte: end } },
      ],
    }),
  ]);

  const formatEnd = lightFormat(new Date(end), "dd/MM/yyyy");
  const formatStart = lightFormat(new Date(start), "dd/MM/yyyy");

  if (checks[0]) throw new Error(`A term that starts on ${formatStart} already exists`);
  if (checks[1]) throw new Error(`A term that ends on ${formatEnd} already exists`);
  if (checks[2]) throw new Error(`A term cannot start on the same day another one ends ${formatStart}`);
  if (checks[3]) throw new Error(`A term cannot end on the same day another one starts ${formatEnd}`);
  if (checks[4]) throw new Error(`A term's dates cannot fall in the dates of another term ${formatStart}-${formatEnd}`);

  const session = await startSession();
  let _id: Schemas.ObjectId | undefined = undefined;

  await session.withTransaction(async () => {
    if (sessionId === "new") {
      const [{ _id }] = await SessionModel.create([body.session], { session });
      sessionId = _id;
    }

    const [term] = await TermModel.create([{ name, start, end, session: sessionId }], { session });
    _id = term._id;
  });

  await session.endSession();

  if (!_id) throw new Error("Could not complete request");

  return [{ data: { _id }, message: ReasonPhrases.CREATED }, StatusCodes.CREATED];
}

export default (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["GET", "POST"]);
