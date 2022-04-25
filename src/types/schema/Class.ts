import { Model, QueryOptions } from "mongoose";

import { DocumentId, ModelRecord, ObjectId, SQuery, TeacherSchema, ThingName } from "types/schema";

export interface ClassSchema extends DocumentId {
  /** The class order. How it'll be sorted when fetched from DB */
  order: number;
  name: ThingName;
  createdAt: Date;
  teachers: ObjectId[];
}

export interface ClassVirtuals {
  subjectsCount: number;
}

export type ClassRecord<V extends boolean | keyof ClassVirtuals = false> = ModelRecord<ClassSchema, ClassVirtuals, V>;

type PopulatedTeachers = Record<"teachers", TeacherSchema[]>;

export interface ClassModel extends Model<ClassSchema, unknown, unknown, ClassVirtuals> {
  /** Find a class by any of it's long, short or special names */
  findByName(
    name: string,
    type: keyof ThingName,
    projection?: unknown,
    options?: QueryOptions
  ): SQuery<ClassSchema, ClassSchema, unknown, ClassVirtuals>;
  /**
   * Get all the teachers linked to the class
   *
   * @param classId Class ID to get for
   * @param teacherProjection Select Teacher fields to return
   * @param options {@link QueryOptions}
   */
  getTeachers(
    classId: string,
    teacherProjection?: unknown,
    options?: QueryOptions
  ): SQuery<PopulatedTeachers, PopulatedTeachers, unknown, ClassVirtuals>;
}
