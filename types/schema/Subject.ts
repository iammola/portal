import { Model } from "mongoose";

import { ModelNames } from "db";
import { DocumentId, ModelRecord, ObjectId, ThingName } from "types/schema";

interface SubjectSchema {
  class: ObjectId;
  mandatory?: true;
  sessions?: ObjectId[];
}

type Subject<T extends ModelNames.B_SUBJECT | ModelNames.G_SUBJECT> = DocumentId &
  SubjectSchema & { __type: T; name: ThingName };

export interface BaseSubjectSchema extends Subject<ModelNames.B_SUBJECT> {
  teachers: ObjectId[];
}

export interface GroupSubjectSchema extends Subject<ModelNames.G_SUBJECT> {
  divisions: Pick<BaseSubjectSchema, "_id" | "name" | "teachers">[];
}

export type SubjectModel = Model<BaseSubjectSchema | GroupSubjectSchema>;
export type SubjectRecord = ModelRecord<BaseSubjectSchema | GroupSubjectSchema>;

export type BaseSubjectModel = Model<BaseSubjectSchema>;
export type BaseSubjectRecord = ModelRecord<BaseSubjectSchema>;

export type GroupSubjectModel = Model<GroupSubjectSchema>;
export type GroupSubjectRecord = ModelRecord<GroupSubjectSchema>;
