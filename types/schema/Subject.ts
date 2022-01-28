import type { Model } from "mongoose";
import type { ObjectId, DocumentId, ModelRecord } from "types/schema";

export interface SubjectDivisionSchema extends DocumentId {
  name: string;
  alias: string;
  // Note: If undefined, subject has divisions
  teachers?: ObjectId[];
}

export interface SubjectSchema extends DocumentId, SubjectDivisionSchema {
  class: ObjectId;
  // Note: If undefined, subject is not required
  required?: true;
  // Note: If undefined, subject exists for all sessions
  sessions?: ObjectId[];
  // Note: If undefined, subject doesn't have divisions
  divisions?: SubjectDivisionSchema[];
}

export type SubjectRecord = ModelRecord<SubjectSchema>;

export type SubjectModel = Model<SubjectSchema>;
