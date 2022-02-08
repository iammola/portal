import type { Model } from "mongoose";
import type { UserBase } from "types/schema/User";
import type { ModelRecord } from "types/schema";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TeacherSchema extends UserBase<true, false> {
  // privileges: ObjectId;
}

export type TeacherRecord = ModelRecord<TeacherSchema>;

export type TeacherModel = Model<TeacherSchema>;
