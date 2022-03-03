import { Model } from "mongoose";

import { DocumentId, ModelRecord, ObjectId, ThingName } from "types/schema";

export interface TermSchema extends DocumentId {
  current?: true;
  name: ThingName;
  session: ObjectId;
}

export type TermRecord = ModelRecord<TermSchema>;

export type TermModel = Model<TermSchema>;
