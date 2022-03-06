import { Schema, model, models, QueryOptions } from "mongoose";

import { ModelNames } from "db";
import { ThingName } from "db/schema/Thing";

import type { TermModel as Model, TermRecord } from "types/schema";

const TermSchema = new Schema<TermRecord, Model>({
  current: {
    type: Boolean,
    default: undefined,
  },
  name: {
    type: ThingName(),
    required: [true, "Term name required"],
  },
  session: {
    type: Schema.Types.ObjectId,
    required: [true, "Term session required"],
  },
});

TermSchema.static("findCurrent", function (...args: [any?, QueryOptions?]) {
  return this.findOne({ current: true }, ...args);
});

export const TermModel = (models[ModelNames.TERM] ?? model(ModelNames.TERM, TermSchema)) as Model;
