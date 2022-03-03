import { Model } from "mongoose";

import { DocumentId, ModelRecord, ObjectId, ThingName } from "types/schema";

export interface ClassSchema extends DocumentId {
  name: ThingName;
  createdAt: Date;
  teachers: ObjectId[];
}

export interface ClassVirtuals {
  subjectsCount: number;
}

export type ClassRecord<V extends boolean | keyof ClassVirtuals = false> =
  ModelRecord<ClassSchema, ClassVirtuals, V>;

export type ClassModel = Model<ClassSchema, unknown, unknown, ClassVirtuals>;
