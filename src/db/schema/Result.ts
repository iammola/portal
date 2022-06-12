import { Schema } from "mongoose";

const ResultScoreSchema = new Schema<Schemas.Result.Score>({
  score: {
    min: 0,
    type: Number,
    required: true,
  },
  fieldId: {
    type: Schema.Types.ObjectId,
    required: true,
    immutable: true,
  },
});

export const ResultScoresSchema = new Schema<Schemas.Result.Scores>({
  subject: {
    type: Schema.Types.ObjectId,
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
