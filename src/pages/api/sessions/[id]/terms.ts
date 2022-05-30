import { startSession } from "mongoose";
import { add, format, isAfter } from "date-fns";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper, NotFoundError } from "api";
import { SessionModel, TermModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<API.Session.POST.Terms.Data> = async (req) => {
  await connect();
  if (req.method === "POST") return POST(req.query.id, req.body);

  return null;
};

async function POST(sessionId: unknown, body: unknown): API.HandlerResponse<API.Session.POST.Terms.Data> {
  const { end, name, start, ...requestBody } = JSON.parse(body as string) as API.Session.POST.Terms.Body;

  if (sessionId === "new") {
    const { session } = requestBody;
    if (!session) throw new Error("Session details required");

    const checks = await Promise.all([
      SessionModel.exists({ "name.long": session.name.long }),
      SessionModel.exists({ "name.short": session.name.short }),
    ]);

    if (checks[0]) throw new Error(`A session with name ${name.long} already exists`);
    if (checks[1]) throw new Error(`A session with alias ${name.short} already exists`);
  } else {
    const checks = await Promise.all([
      TermModel.exists({ session: sessionId, "name.long": name.long }),
      TermModel.exists({ session: sessionId, "name.short": name.short }),
    ]);

    if (checks[0]) throw new NotFoundError(`A term with name ${name.long} in the specified session already exists`);
    if (checks[1]) throw new NotFoundError(`A term with alias ${name.short} in the specified session already exists`);
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

  const formattedEnd = format(new Date(end), "dd/MM/yyyy");
  const formattedStart = format(new Date(start), "dd/MM/yyyy");

  if (checks[0]) throw new NotFoundError(`A term that starts on ${formattedStart} already exists`);
  if (checks[1]) throw new NotFoundError(`A term that ends on ${formattedEnd} already exists`);
  if (checks[2]) throw new NotFoundError(`A term cannot start on the same day another one ends ${formattedStart}`);
  if (checks[3]) throw new NotFoundError(`A term cannot end on the same day another one starts ${formattedEnd}`);
  if (checks[4])
    throw new NotFoundError(
      `A term's dates cannot fall in the dates of another term ${formattedStart}-${formattedEnd}`
    );

  const session = await startSession();
  let _id: Schemas.ObjectId | undefined = undefined;

  await session.withTransaction(async () => {
    if (sessionId === "new") {
      const [{ _id }] = await SessionModel.create([requestBody.session], { session });
      sessionId = _id;
    }

    const [term] = await TermModel.create([{ name, start, end, session: sessionId }], { session });
    _id = term._id;
  });

  await session.endSession();

  if (!_id) throw new Error("Could not complete request");

  return [{ data: { _id }, message: ReasonPhrases.CREATED }, StatusCodes.CREATED];
}

export default (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["POST"]);
