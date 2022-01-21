import type { Model } from "mongoose";
import type { UserBase } from "types/schema/User";
import type { ModelRecord, ObjectId } from "types/schema";

// Note: The `_id` ObjectId property should be provided when creating the document as the guardian's id
export interface StudentGuardianSchema {
    linkedOn: Date;
    guardian: ObjectId;
    relationship: "father" | "mother" | string;
}

export interface StudentSchema extends UserBase<false> {
    guardians: StudentGuardianSchema[];
}

export type StudentRecord = ModelRecord<StudentSchema>;

export type StudentModel = Model<StudentSchema>;
