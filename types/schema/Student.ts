import type { Model } from "mongoose";
import type { UserBase } from "types/schema/User";
import type { ModelRecord, ObjectId } from "types/schema";

export interface StudentGuardianSchema {
  guardian: ObjectId;
  relation: "father" | "mother" | "other";
}

export interface StudentSchema extends UserBase<false> {
  guardians: StudentGuardianSchema[];
}

export type StudentRecord = ModelRecord<StudentSchema>;

export type StudentModel = Model<StudentSchema>;
