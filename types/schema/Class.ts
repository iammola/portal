import type { ObjectId, DocumentId } from "types/schema";

export interface ClassSchema extends DocumentId {
    name: string;
    alias: string;
    special: string;
    createdOn: Date;
    teachers: ObjectId[];
    subjects: ObjectId[];
}
