import type { Model } from "mongoose";
import type { ModelRecord, ObjectId } from "types/schema";

export interface SubjectSchema {
  class: ObjectId;
  required?: true;
  sessions?: ObjectId[];
}

export type SubjectRecord = ModelRecord<SubjectSchema>;

export type SubjectModel = Model<SubjectSchema>;
