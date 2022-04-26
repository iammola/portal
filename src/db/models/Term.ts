import * as mongoose from "mongoose";

import { ModelNames } from "db";
import { ThingName } from "db/schema/Thing";

const TermSchema = new mongoose.Schema<Schemas.Term.Record, Schemas.Term.Model>({
  current: {
    type: Boolean,
    default: undefined,
  },
  name: {
    type: ThingName(),
    required: [true, "Term name required"],
  },
  session: {
    ref: ModelNames.SESSION,
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Term session required"],
  },
});

TermSchema.static(
  "findCurrent",
  function (...args: [mongoose.ProjectionType<Schemas.Term.Record>?, mongoose.QueryOptions?]) {
    return this.findOne({ current: true }, ...args);
  }
);

export const TermModel = (mongoose.models[ModelNames.TERM] ??
  mongoose.model(ModelNames.TERM, TermSchema)) as Schemas.Term.Model;
