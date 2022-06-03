import { model, models, Schema } from "mongoose";

import { ModelNames } from "db";
import { TermName } from "db/schema/Term";

import type { ProjectionType, QueryOptions } from "mongoose";

const TermSchema = new Schema<Schemas.Term.Record, Schemas.Term.Model>(
  {
    name: {
      type: TermName,
      required: [true, "Term name required"],
    },
    session: {
      ref: ModelNames.SESSION,
      type: Schema.Types.ObjectId,
      required: [true, "Term session required"],
    },
    start: {
      type: Date,
      required: [true, "Term start date required"],
    },
    end: {
      type: Date,
      required: [true, "Term end date required"],
      validate: {
        message: "End date must be after start date",
        validator: function (this: Schemas.Term.Record, end?: Date) {
          return end === undefined ? true : new Date(end).getTime() > new Date(this.start).getTime();
        },
      },
    },
  },
  { versionKey: false }
);

TermSchema.virtual("current").get(function () {
  const start = new Date(this.start).getTime();
  const end = new Date(this.end).getTime();

  return Date.now() >= start && Date.now() <= end;
});

TermSchema.static("findCurrent", function (...args: [ProjectionType<Schemas.Term.Record>?, QueryOptions?]) {
  return TermModel.findOne({ start: { $lte: new Date() }, end: { $gte: new Date() } }, ...args);
});

export const TermModel = (models[ModelNames.TERM] ?? model(ModelNames.TERM, TermSchema)) as Schemas.Term.Model;
