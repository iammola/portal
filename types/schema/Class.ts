import { Model, QueryOptions } from "mongoose";

import { DocumentId, ModelRecord, ObjectId, SQuery, ThingName } from "types/schema";

export interface ClassSchema extends DocumentId {
  name: ThingName;
  createdAt: Date;
  teachers: ObjectId[];
}

export interface ClassVirtuals {
  subjectsCount: number;
}

export type ClassRecord<V extends boolean | keyof ClassVirtuals = false> = ModelRecord<
  ClassSchema,
  ClassVirtuals,
  V
>;

export interface ClassModel extends Model<ClassSchema, unknown, unknown, ClassVirtuals> {
  /** Find a class by any it's long, short or special names */
  findByName(
    name: string,
    type: keyof ThingName,
    projection?: any,
    options?: QueryOptions
  ): SQuery<ClassSchema, ClassSchema, unknown, ClassVirtuals>;
}
