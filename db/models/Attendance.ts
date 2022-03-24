import { model, models, QueryOptions, QuerySelector, Schema, Types } from "mongoose";

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

AttendanceSchema.static("findUser", function (userId: string | string[], ...args: [any?, QueryOptions?]) {
  if (Array.isArray(userId)) return this.find({ userId }, ...args);
  return this.findOne({ userId }, ...args);
});

AttendanceSchema.static("findUserRange", function (userId: string | string[], query: QuerySelector<Date>) {
  return this.aggregate([
    {
      $match: {
        userId: {
          $in: [userId].flat().map((id) => new Types.ObjectId(id)),
        },
      },
    },
    {
      $project: {
        dates: {
          $filter: {
            input: "$dates",
            cond: {
              $and: Object.entries(query).reduce(
                (acc, [key, val]) => [...acc, { [key]: ["$$this.in", val] }],
                [] as Array<Record<string, any>>
              ),
            },
          },
        },
      },
    },
  ]);
});

export const AttendanceModel = (models[ModelNames.ATTENDANCE] ??
  model(ModelNames.ATTENDANCE, AttendanceSchema)) as Model;
