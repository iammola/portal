import type { Schema } from "mongoose";
import type { ObjectId as BSONId } from "bson";

export type ObjectId = BSONId & Schema.Types.ObjectId;

export interface DocumentId {
    _id: ObjectId;
}

export * from "./Class";
export * from "./Subject";
