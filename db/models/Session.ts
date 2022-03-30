import { Schema, model, models, QueryOptions } from "mongoose";

import { ModelNames } from "db";
import { ThingName } from "db/schema/Thing";

import type { SessionModel as Model, SessionRecord } from "types/schema";

const SessionSchema = new Schema<SessionRecord, Model>({
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

SessionSchema.static("findCurrent", function (...args: [unknown?, QueryOptions?]) {
  return this.findOne({ current: true }, ...args);
});

export const SessionModel = (models[ModelNames.SESSION] ?? model(ModelNames.SESSION, SessionSchema)) as Model;
