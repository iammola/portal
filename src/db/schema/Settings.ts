import { Schema } from "mongoose";

const SchoolTime = new Schema<Schemas.Settings.SchoolTime>(
  {
    days: {
      type: [Number],
      enum: [0, 1, 2, 3, 4, 5, 6],
    },
    value: {
      type: Date,
    },
  },
  { _id: false }
);

const PeriodDuration = new Schema<Schemas.Settings.PeriodDurations>(
  {
    min: {
      type: Number,
      min: 0,
    },
    max: {
      type: Number,
      min: 0,
    },
  },
  { _id: false }
);

export const ActiveSchoolTime = new Schema<Schemas.Settings.Record["activeSchoolTime"]>(
  {
    start: { type: [SchoolTime] },
    end: { type: [SchoolTime] },
  },
  { _id: false }
);

export const PeriodDurations = new Schema<Schemas.Settings.Record["periodDurations"]>(
  {
    idle: { type: PeriodDuration },
    subject: { type: PeriodDuration },
  },
  { _id: false }
);
