import { model, models, Schema } from "mongoose";

import { ModelNames } from "db";
import { DateSchema } from "db/schema/Attendance";

import type { ProjectionType, QueryOptions, QuerySelector } from "mongoose";

const AttendanceSchema = new Schema<Schemas.Attendance.Record, Schemas.Attendance.Model>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      immutable: true,
    },
    dates: {
      type: [DateSchema],
      default: undefined,
    },
  },
  { versionKey: false }
);

AttendanceSchema.static(
  "findUser",
  function (userId: string | string[], ...args: [ProjectionType<Schemas.Attendance.Record>?, QueryOptions?]) {
    if (Array.isArray(userId)) return this.find({ userId: { $in: userId } }, ...args);
    return this.findOne({ userId }, ...args);
  }
);

AttendanceSchema.static("findUserRange", function (userId: string | string[], query: QuerySelector<Date>) {
  return this.aggregate([
    {
      $match: {
        userId: {
          $in: [userId].flat().map((id) => new Schema.Types.ObjectId(id)),
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
                [] as Array<Record<string, unknown>>
              ),
            },
          },
        },
      },
    },
  ]);
});

export const AttendanceModel = (models[ModelNames.ATTENDANCE] ??
  model(ModelNames.ATTENDANCE, AttendanceSchema)) as Schemas.Attendance.Model;
