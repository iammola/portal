import * as mongoose from "mongoose";

import { ModelNames } from "db/constants";
import { ResultScoresSchema } from "db/schema/Result";

const ResultSchema = new mongoose.Schema<Schemas.Result.Schema, Schemas.Result.Model>(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      immutable: true,
    },
    term: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      immutable: true,
    },
    scores: {
      type: [ResultScoresSchema],
    },
  },
  { versionKey: false }
);

export const ResultModel = (mongoose.models[ModelNames.RESULT] ??
  mongoose.model(ModelNames.RESULT, ResultSchema)) as Schemas.Result.Model;
