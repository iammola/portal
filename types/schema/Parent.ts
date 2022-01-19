import type { Model } from "mongoose";
import type { UserBase } from "types/schema/User";
import type { DocumentId, ModelRecord } from "types/schema";

export interface ParentSchema extends DocumentId, UserBase {
    occupation: string;
    name: {
        [K in "title" | "username" | "initials" | "full" | "first" | "other" | "last"]: string;
    };
}

export type ParentRecord = ModelRecord<ParentSchema>;

export type ParentModel = Model<ParentSchema>;
