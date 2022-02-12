import type { ModelNames } from "db";
import type { Model } from "mongoose";
import type { DocumentId, ModelRecord, ObjectId } from "types/schema";

interface SubjectSchema {
  class: ObjectId;
  mandatory?: true;
  sessions?: ObjectId[];
}

interface Subject<T extends ModelNames.B_SUBJECT | ModelNames.G_SUBJECT>
  extends DocumentId,
    SubjectSchema {
  __type: T;
  name: string;
  alias: string;
}

interface BaseSubjectSchema extends Subject<ModelNames.B_SUBJECT> {
  teachers: ObjectId[];
}

interface GroupSubjectSchema extends Subject<ModelNames.G_SUBJECT> {
  divisions: Pick<BaseSubjectSchema, "_id" | "name" | "alias" | "teachers">[];
}

export type SubjectModel = Model<BaseSubjectSchema | GroupSubjectSchema>;
export type SubjectRecord = ModelRecord<BaseSubjectSchema | GroupSubjectSchema>;

export type BaseSubjectModel = Model<BaseSubjectSchema>;
export type BaseSubjectRecord = ModelRecord<BaseSubjectSchema>;

export type GroupSubjectModel = Model<GroupSubjectSchema>;
export type GroupSubjectRecord = ModelRecord<GroupSubjectSchema>;
