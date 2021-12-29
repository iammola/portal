import type { ObjectId, DocumentId } from "types/schema";

export interface ClassSchema extends DocumentId {
    name: string;
    alias: string;
    special: string;
    createdAt: Date;
    teachers: ObjectId[];
    subjects: ObjectId[];
}
