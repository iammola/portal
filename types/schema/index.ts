import type { FlattenIntersection } from "types/utils";
import type { Schema as MSchema } from "mongoose";
import type { ObjectId as BsonId } from "bson";

export type ObjectId = BsonId & MSchema.Types.ObjectId;

export interface DocumentId {
    _id: ObjectId;
}

export type ModelRecord<S, V = unknown, K extends boolean | keyof V = false> = S &
    (K extends true ? V : FlattenIntersection<K extends keyof V ? Pick<V, K> : unknown>);

export * from "./Class";
export * from "./Subject";
export * from "./Parent";
export * from "./Student";
export * from "./Teacher";
