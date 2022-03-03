import { Schema, model, models } from "mongoose";

import { ModelNames } from "db";
import { ThingName } from "db/schema/Thing";

import type { TermModel as TermModelType, TermRecord } from "types/schema";

const TermSchema = new Schema<TermRecord, TermModelType>({
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

export const TermModel = (models[ModelNames.TERM] ??
  model(ModelNames.TERM, TermSchema)) as TermModelType;
