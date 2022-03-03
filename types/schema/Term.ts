import { Document, Query, Model } from "mongoose";

import { DocumentId, ModelRecord, ObjectId, ThingName } from "types/schema";

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
  findCurrent(): Query<
    (Document<unknown, any, TermSchema> & TermSchema) | null,
    Document<unknown, any, TermSchema> & TermSchema,
    Record<string, never>,
    TermSchema
  >;
}
