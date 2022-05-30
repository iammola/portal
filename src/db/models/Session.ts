import * as mongoose from "mongoose";

import { ModelNames } from "db";
import { TermModel } from "db/models/Term";
import { SessionName } from "db/schema/Session";

const SessionSchema = new mongoose.Schema<Schemas.Session.Record, Schemas.Session.Model>({
  name: {
    type: SessionName,
    required: [true, "Session name required"],
  },
});

SessionSchema.virtual("terms", {
  ref: ModelNames.TERM,
  localField: "_id",
  foreignField: "session",
});

SessionSchema.virtual("termsCount", {
  ref: ModelNames.TERM,
  count: true,
  localField: "_id",
  foreignField: "session",
});

SessionSchema.static(
  "findCurrent",
  async function (...args: [mongoose.ProjectionType<Schemas.Session.Record>?, mongoose.QueryOptions?]) {
    const term = await TermModel.findCurrent("session", args[1]).lean();
    if (term == null) return null;

    return await this.findById(term.session, ...args);
  }
);

export const SessionModel = (mongoose.models[ModelNames.SESSION] ??
  mongoose.model(ModelNames.SESSION, SessionSchema)) as Schemas.Session.Model;
