import { Model } from "mongoose";

import { ModelRecord } from "types/schema";
import { UserBase, UserVirtuals } from "types/schema/User";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TeacherSchema extends UserBase<true, false> {
  // privileges: ObjectId;
}

export type TeacherRecord<V extends boolean | keyof UserVirtuals = false> =
  ModelRecord<TeacherSchema, UserVirtuals, V>;

export type TeacherModel = Model<TeacherSchema, unknown, unknown, UserVirtuals>;
