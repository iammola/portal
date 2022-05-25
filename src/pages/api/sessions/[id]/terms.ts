import { format } from "date-fns";
import { startSession } from "mongoose";
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
  const { current, name, start } = JSON.parse(body as string) as API.Session.POST.Terms.Body;

  if (isNaN(new Date(start).getTime())) throw new Error("Invalid Start Date");

  const checks = await Promise.all([
    SessionModel.findById(sessionId, "current"),
    TermModel.exists({ session: sessionId, "name.long": name.long }),
    TermModel.exists({ session: sessionId, "name.short": name.short }),
    TermModel.exists({ session: sessionId, start }),
  ]);

  if (checks[0] == null) throw new NotFoundError("Session not found");
  if (checks[1] != null)
    throw new NotFoundError(`A term with name ${name.long} in the specified session already exists`);
  if (checks[2] != null)
    throw new NotFoundError(`A term with alias ${name.short} in the specified session already exists`);
  if (checks[3] != null)
    throw new NotFoundError(
      `A term with start date ${format(start, "dd/MM/yyyy")} in the specified session already exists`
    );

  const session = await startSession();
  let _id: Schemas.ObjectId | undefined = undefined;

  await session.withTransaction(async () => {
    const [term] = await TermModel.create([{ name, start, current, session: sessionId }], { session });
    _id = term._id;

    if (current) {
      const queries: unknown[] = [
        // Remove `current` from other terms with `{ current: true }`
        TermModel.updateMany({ _id: { $ne: _id }, current: true }, { $unset: { current: "" } }, { session }),
      ];

      if (!checks[0]?.current) {
        queries.push(
          // Remove `current` from other Sessions with `{ current: true }`
          SessionModel.updateMany({ _id: { $ne: sessionId }, current: true }, { $unset: { current: "" } }, { session }),
          // Set specified session's `current` to `true`
          SessionModel.updateOne({ _id: sessionId }, { current: true }, { session })
        );
      }

      await Promise.all(queries);
    }
  });

  await session.endSession();

  if (!_id) throw new Error("Could not complete request");

  return [{ data: { _id }, message: ReasonPhrases.CREATED }, StatusCodes.CREATED];
}

export default (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["POST"]);
