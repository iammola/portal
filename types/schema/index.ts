import type { Schema } from "mongoose";
import type { ObjectId as BSONId } from "bson";
import type { FlattenIntersection } from "types/utils";

export type ObjectId = BSONId & Schema.Types.ObjectId;

export interface DocumentId {
    _id: ObjectId;
}

export type ModelRecord<S, V, K extends boolean | keyof V = false> = S &
    (K extends true ? V : FlattenIntersection<K extends keyof V ? Pick<V, K> : unknown>);

export * from "./Class";
export * from "./Subject";
export * from "./Parent";
export * from "./Student";
export * from "./Teacher";
