import { model, models, Schema } from "mongoose";

import { ModelNames } from "db/constants";
import { ResultScoresSchema } from "db/schema/Result";

const ResultSchema = new Schema<Schemas.Result.Schema, Schemas.Result.Model>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      required: true,
      immutable: true,
    },
    term: {
      type: Schema.Types.ObjectId,
      required: true,
      immutable: true,
    },
    scores: {
      type: [ResultScoresSchema],
    },
  },
  { versionKey: false }
);

export const ResultModel = (models[ModelNames.RESULT] ??
  model(ModelNames.RESULT, ResultSchema)) as Schemas.Result.Model;
