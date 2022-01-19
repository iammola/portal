import type { Model } from "mongoose";
import type { DocumentId, ModelRecord } from "types/schema";
import type { UserPassword, UserImage, UserBase } from "types/schema/User";

export interface ParentSchema extends DocumentId, UserBase {
    image: UserImage;
    password: UserPassword;
    occupation: string;
    name: {
        [K in "title" | "username" | "initials" | "full" | "first" | "other" | "last"]: string;
    };
}

export type ParentRecord = ModelRecord<ParentSchema>;

export type ParentModel = Model<ParentSchema>;
