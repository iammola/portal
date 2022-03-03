import { ObjectId as BsonId } from "bson";
import { Schema as MSchema } from "mongoose";

import { FlattenIntersection } from "types/utils";

// Todo: Get a better name than "Thing" for this type. Meant to group classes or subjects or terms or sessions
export type ThingName = Record<"long" | "short", string> & { special?: string };

export type ObjectId = BsonId & MSchema.Types.ObjectId;

export interface DocumentId {
  _id: ObjectId;
}

export type ModelRecord<
  S,
  V = unknown,
  K extends boolean | keyof V = false
> = S &
  (K extends true
    ? V
    : FlattenIntersection<K extends keyof V ? Pick<V, K> : unknown>);

export * from "./User";
export * from "./Class";
export * from "./Parent";
export * from "./Subject";
export * from "./Student";
export * from "./Teacher";
