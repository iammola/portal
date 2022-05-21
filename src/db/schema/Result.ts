import * as mongoose from "mongoose";

const ResultScoreSchema = new mongoose.Schema<Schemas.Result.Score>({
  score: {
    min: 0,
    type: Number,
    required: true,
  },
  fieldId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    immutable: true,
  },
});

export const ResultScoresSchema = new mongoose.Schema<Schemas.Result.Scores>({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    immutable: true,
  },
  forcedTotal: {
    type: Number,
    default: undefined,
  },
  data: {
    type: [ResultScoreSchema],
    default: undefined,
  },
});
