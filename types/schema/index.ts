import { ObjectId as BsonId } from "bson";
import { Document, Query, Schema } from "mongoose";

import { FlattenIntersection } from "types/utils";

// Todo: Get a better name than "Thing" for this type. Meant to group classes or subjects or terms or sessions
export type ThingName = Record<"long" | "short", string> & { special?: string };

export type ObjectId = BsonId & Schema.Types.ObjectId;

export interface DocumentId {
  _id: ObjectId;
}

export type ModelRecord<S, V = unknown, K extends boolean | keyof V = false> = S &
  (K extends true ? V : FlattenIntersection<K extends keyof V ? Pick<V, K> : unknown>);

export type SQuery<S> = Query<
  (Document<any, any, S> & S) | null,
  Document<any, any, S> & S,
  Record<string, never>,
  S
>;

export * from "./User";
export * from "./Term";
export * from "./Class";
export * from "./Parent";
export * from "./Session";
export * from "./Subject";
export * from "./Student";
export * from "./Teacher";
