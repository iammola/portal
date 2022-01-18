import type { Model } from "mongoose";
import type { DocumentId, ModelRecord, ObjectId } from "types/schema";

export interface ClassSchema extends DocumentId {
    name: string;
    alias: string;
    special: string;
    createdAt: Date;
    teachers: ObjectId[];
}

export interface ClassVirtuals {
    subjectsCount: number;
}

export type ClassRecord<V extends boolean | keyof ClassVirtuals = false> = ModelRecord<
    ClassSchema,
    ClassVirtuals,
    V
>;

export type ClassModel = Model<ClassSchema, unknown, unknown, ClassVirtuals>;
