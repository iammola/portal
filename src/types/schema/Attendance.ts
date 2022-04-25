import { Model, QueryOptions, QuerySelector } from "mongoose";

import { AQuery, DocumentId, ModelRecord, ObjectId, SQuery } from "types/schema";

export interface AttendanceSchema extends DocumentId {
  userId: ObjectId;
  dates: AttendanceDate[];
}

export type AttendanceDate = {
  readonly in: Date;
  readonly out: Date;
  readonly state: "present" | "late";
};

export type AttendanceRecord = ModelRecord<AttendanceSchema>;

export interface AttendanceModel extends Model<AttendanceSchema> {
  /** Find one user's attendance records by userId */
  findUser(userId: string, projection?: unknown, options?: QueryOptions): SQuery<AttendanceSchema>;
  /** Find multiple users attendance records by userId */
  findUser(
    userId: string[],
    projection?: unknown,
    options?: QueryOptions
  ): SQuery<AttendanceSchema[], AttendanceSchema>;
  /**
   * Filter a range of dates for specific users
   *
   * @param userId User to find attendance record for
   * @param query The conditions to filter the attendance with
   */
  findUserRange(userId: string | string[], query: QuerySelector<Date>): AQuery<Pick<AttendanceSchema, "dates">>;
}
