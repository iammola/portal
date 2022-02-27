import type { Model } from "mongoose";
import type { ModelRecord, ObjectId } from "types/schema";
import type { UserBase, UserVirtuals } from "types/schema/User";

export interface StudentGuardianSchema {
  guardian: ObjectId;
  relation: "father" | "mother" | "other";
}

export interface StudentAcademicSchema {
  current?: true;
  class: ObjectId;
  session: ObjectId;
  terms: StudentAcademicTermSchema[];
}

export interface StudentAcademicTermSchema {
  term: ObjectId;
  current?: true;
  subjects: ObjectId[];
}

export interface StudentSchema extends UserBase<false> {
  academic: StudentAcademicSchema[];
  guardians: StudentGuardianSchema[];
}

export type StudentRecord<V extends boolean | keyof UserVirtuals = false> =
  ModelRecord<StudentSchema, UserVirtuals, V>;

export type StudentModel = Model<StudentSchema, unknown, unknown, UserVirtuals>;
