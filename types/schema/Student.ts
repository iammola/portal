import { Model } from "mongoose";

import { ModelRecord, ObjectId } from "types/schema";
import { UserBase, UserStaticMethods, UserVirtuals } from "types/schema/User";

export interface StudentGuardianSchema {
  guardian: ObjectId;
  relation: "father" | "mother" | "other";
}

export interface StudentAcademicSchema {
  term: ObjectId;
  class: ObjectId;
  subjects: ObjectId[];
}

export interface StudentSchema extends UserBase {
  academic: StudentAcademicSchema[];
  guardians: StudentGuardianSchema[];
}

export type StudentRecord<V extends boolean | keyof UserVirtuals = false> = ModelRecord<StudentSchema, UserVirtuals, V>;

export interface StudentModel
  extends Model<StudentSchema, unknown, unknown, UserVirtuals>,
    UserStaticMethods<StudentSchema> {}
