import { Model } from "mongoose";

import { DocumentId, ModelRecord, ObjectId } from "types/schema";

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

export type AttendanceModel = Model<AttendanceSchema>;
