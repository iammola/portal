import * as mongoose from "mongoose";

import { ModelNames } from "db";
import { TermName } from "db/schema/Term";

const TermSchema = new mongoose.Schema<Schemas.Term.Record, Schemas.Term.Model>({
  current: {
    type: Boolean,
    default: undefined,
  },
  name: {
    type: TermName,
    required: [true, "Term name required"],
  },
  session: {
    ref: ModelNames.SESSION,
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Term session required"],
  },
  start: {
    type: Date,
    required: [true, "Term start date required"],
  },
  end: {
    type: Date,
    default: undefined,
    validate: {
      message: "End date must be after start date",
      validator: function (this: Schemas.Term.Record, end?: Date) {
        return end === undefined ? true : new Date(end).getTime() > new Date(this.start).getTime();
      },
    },
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
