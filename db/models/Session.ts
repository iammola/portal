import { Schema, model, models } from "mongoose";

import { ModelNames } from "db";
import { ThingName } from "db/schema/Thing";

import type {
  SessionModel as SessionModelType,
  SessionRecord,
} from "types/schema";

const SessionSchema = new Schema<SessionRecord, SessionModelType>({
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

SessionSchema.static("findCurrent", function () {
  return this.findOne({ current: true });
});

export const SessionModel = (models[ModelNames.SESSION] ??
  model(ModelNames.SESSION, SessionSchema)) as SessionModelType;
