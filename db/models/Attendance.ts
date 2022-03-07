import { model, models, Schema } from "mongoose";

import { ModelNames } from "db";
import { DateSchema } from "db/schema/Attendance";

import type { AttendanceModel as Model, AttendanceRecord } from "types/schema";

const AttendanceSchema = new Schema<AttendanceRecord, Model>({
  userId: {
    type: Schema.Types.ObjectId,
    immutable: true,
  },
  dates: {
    type: [DateSchema],
    default: undefined,
  },
});

export const AttendanceModel = (models[ModelNames.ATTENDANCE] ??
  model(ModelNames.ATTENDANCE, AttendanceSchema)) as Model;
