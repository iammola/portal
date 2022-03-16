import { Model, QueryOptions } from "mongoose";

import { DocumentId, ModelRecord, ObjectId, SQuery, TeacherSchema, ThingName } from "types/schema";

export interface ClassSchema extends DocumentId {
  name: ThingName;
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

type PopulatedTeachers = Record<"teachers", TeacherSchema[]>;

export interface ClassModel extends Model<ClassSchema, unknown, unknown, ClassVirtuals> {
  /** Find a class by any it's long, short or special names */
  findByName(
    name: string,
    type: keyof ThingName,
    projection?: any,
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
    teacherProjection?: any,
    options?: QueryOptions
  ): SQuery<PopulatedTeachers, PopulatedTeachers, unknown, ClassVirtuals>;
}
