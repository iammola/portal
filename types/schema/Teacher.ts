import type { Model } from "mongoose";
import type { UserBase } from "types/schema/User";
import type { DocumentId, ModelRecord, ObjectId } from "types/schema";

export interface TeacherSchema extends DocumentId, UserBase {
    privileges: ObjectId;
    name: {
        [K in "title" | "username" | "initials" | "full" | "first" | "other" | "last"]: string;
    };
}

export type TeacherRecord = ModelRecord<TeacherSchema>;

export type TeacherModel = Model<TeacherSchema>;
