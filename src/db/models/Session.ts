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
  function ([proj, opts]: [mongoose.ProjectionType<Schemas.Session.Record>?, mongoose.QueryOptions?]) {
    return TermModel.findOne({ start: { $gte: new Date() }, end: { $lte: new Date() } }, "session", opts).populate(
      "session",
      proj
    );
  }
);

export const SessionModel = (mongoose.models[ModelNames.SESSION] ??
  mongoose.model(ModelNames.SESSION, SessionSchema)) as Schemas.Session.Model;
