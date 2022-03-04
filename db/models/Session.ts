import { Schema, model, models } from "mongoose";

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
  options: { populate: "-session" },
});

SessionSchema.static("findCurrent", function (projection?: any) {
  return this.findOne({ current: true }, projection);
});

export const SessionModel = (models[ModelNames.SESSION] ??
  model(ModelNames.SESSION, SessionSchema)) as Model;