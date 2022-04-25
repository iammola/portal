import { Model } from "mongoose";

import { ModelNames } from "db";
import { DocumentId, ModelRecord, ObjectId, ThingName } from "types/schema";

interface SubjectSchema {
  class: ObjectId;
  order: number;
  mandatory?: true;
  sessions?: ObjectId[];
}

interface Subject<T extends ModelNames.B_SUBJECT | ModelNames.G_SUBJECT> extends DocumentId, SubjectSchema {
  __type: T;
  name: ThingName;
}

export interface BaseSubjectSchema extends Subject<ModelNames.B_SUBJECT> {
  teachers: ObjectId[];
}

export interface BaseSubjectVirtuals {
  teachersCount: number;
}

export interface GroupSubjectSchema extends Subject<ModelNames.G_SUBJECT> {
  divisions: Array<Pick<BaseSubjectSchema, "_id" | "name" | "teachers">>;
}

export interface GroupSubjectVirtuals {
  divisionsCount: number;
}

export type SubjectModel = Model<BaseSubjectSchema | GroupSubjectSchema>;
export type SubjectRecord<V extends boolean = false> = ModelRecord<
  BaseSubjectRecord<V> | GroupSubjectRecord<V>,
  Partial<BaseSubjectVirtuals & GroupSubjectVirtuals>,
  V
>;

export type BaseSubjectModel = Model<BaseSubjectSchema>;
export type BaseSubjectRecord<V extends boolean | keyof BaseSubjectVirtuals = false> = ModelRecord<
  BaseSubjectSchema,
  BaseSubjectVirtuals,
  V
>;

export type GroupSubjectModel = Model<GroupSubjectSchema>;
export type GroupSubjectRecord<V extends boolean | keyof GroupSubjectVirtuals = false> = ModelRecord<
  GroupSubjectSchema,
  GroupSubjectVirtuals,
  V
>;
