import type { Model } from "mongoose";
import type { UserBase } from "types/schema/User";
import type { ModelRecord, ObjectId } from "types/schema";

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

export type StudentRecord = ModelRecord<StudentSchema>;

export type StudentModel = Model<StudentSchema>;
