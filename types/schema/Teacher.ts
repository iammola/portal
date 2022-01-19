import type { Model } from "mongoose";
import type { UserBase } from "types/schema/User";
import type { DocumentId, ModelRecord, ObjectId } from "types/schema";

export interface TeacherSchema extends DocumentId, UserBase {
    privileges: ObjectId;
}

export type TeacherRecord = ModelRecord<TeacherSchema>;

export type TeacherModel = Model<TeacherSchema>;
