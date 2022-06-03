import { model, models, Schema } from "mongoose";

import { ModelNames } from "db";
import { TermModel } from "db/models/Term";
import { SessionName } from "db/schema/Session";

import type { ProjectionType, QueryOptions } from "mongoose";

const SessionSchema = new Schema<Schemas.Session.Record, Schemas.Session.Model>(
  {
    name: {
      type: SessionName,
      required: [true, "Session name required"],
    },
  },
  { versionKey: false }
);

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

SessionSchema.static("findCurrent", async function (...args: [ProjectionType<Schemas.Session.Record>?, QueryOptions?]) {
  const term = await TermModel.findCurrent("session", args[1]).lean();
  if (term == null) return null;

  return await this.findById(term.session, ...args).lean();
});

export const SessionModel = (models[ModelNames.SESSION] ??
  model(ModelNames.SESSION, SessionSchema)) as Schemas.Session.Model;
