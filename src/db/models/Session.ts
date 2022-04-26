import * as mongoose from "mongoose";

import { ModelNames } from "db";
import { ThingName } from "db/schema/Thing";

const SessionSchema = new mongoose.Schema<Schemas.Session.Record, Schemas.Session.Model>({
  current: {
    type: Boolean,
    default: undefined,
  },
  name: {
    type: ThingName(),
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
  function (...args: [mongoose.ProjectionType<Schemas.Session.Record>?, mongoose.QueryOptions?]) {
    return this.findOne({ current: true }, ...args);
  }
);

export const SessionModel = (mongoose.models[ModelNames.SESSION] ??
  mongoose.model(ModelNames.SESSION, SessionSchema)) as Schemas.Session.Model;
