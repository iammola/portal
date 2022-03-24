import { Model } from "mongoose";

import { ModelRecord } from "types/schema";
import { UserBase, UserStaticMethods, UserVirtuals } from "types/schema/User";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TeacherSchema extends UserBase {
  // privileges: ObjectId;
}

export type TeacherRecord<V extends boolean | keyof UserVirtuals = false> = ModelRecord<TeacherSchema, UserVirtuals, V>;

export interface TeacherModel
  extends Model<TeacherSchema, unknown, unknown, UserVirtuals>,
    UserStaticMethods<TeacherSchema> {}
