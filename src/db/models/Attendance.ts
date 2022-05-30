import * as mongoose from "mongoose";

import { ModelNames } from "db";
import { DateSchema } from "db/schema/Attendance";

const AttendanceSchema = new mongoose.Schema<Schemas.Attendance.Record, Schemas.Attendance.Model>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
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
  function (
    userId: string | string[],
    ...args: [mongoose.ProjectionType<Schemas.Attendance.Record>?, mongoose.QueryOptions?]
  ) {
    if (Array.isArray(userId)) return this.find({ userId: { $in: userId } }, ...args);
    return this.findOne({ userId }, ...args);
  }
);

AttendanceSchema.static("findUserRange", function (userId: string | string[], query: mongoose.QuerySelector<Date>) {
  return this.aggregate([
    {
      $match: {
        userId: {
          $in: [userId].flat().map((id) => new mongoose.Types.ObjectId(id)),
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

export const AttendanceModel = (mongoose.models[ModelNames.ATTENDANCE] ??
  mongoose.model(ModelNames.ATTENDANCE, AttendanceSchema)) as Schemas.Attendance.Model;
