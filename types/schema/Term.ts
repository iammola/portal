import { Model } from "mongoose";

import { DocumentId, ModelRecord, ObjectId, SQuery, ThingName } from "types/schema";

export interface TermSchema extends DocumentId {
  current?: true;
  name: ThingName;
  session: ObjectId;
}

export type TermRecord = ModelRecord<TermSchema>;

export interface TermModel extends Model<TermSchema> {
  /**
   * Find the term record where `{ current: true }`
   */
  findCurrent(projection?: any): SQuery<TermSchema>;
}
