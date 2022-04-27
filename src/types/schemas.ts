import * as bson from "bson";
import * as Mongoose from "mongoose";

import { ModelNames } from "db";

declare global {
  namespace Schemas {
    export type DocumentId = Record<"_id", ObjectId>;
    export type ObjectId = bson.ObjectId & Mongoose.Schema.Types.ObjectId;

    export type AQuery<R> = Mongoose.Aggregate<R[]>;
    export type SQuery<S, R = S, M = unknown, V = unknown> = Mongoose.Query<
      S extends Array<infer A> ? Array<Mongoose.HydratedDocument<A, M, V>> : Mongoose.HydratedDocument<S, M, V> | null,
      Mongoose.HydratedDocument<S, M, V>,
      unknown,
      R
    >;

    export type ModelRecord<S, V = unknown, K extends boolean | keyof V = false> = S &
      (K extends true ? V : Utils.FlattenIntersection<K extends keyof V ? Pick<V, K> : unknown>);

    // Todo: Get a better name than "Thing" for this type. Meant to group classes or subjects or terms or sessions
    export type ThingName = Record<"long" | "short", string> & { special?: string };
  }

  namespace Schemas {
    namespace Attendance {
      export interface Schema extends DocumentId {
        userId: ObjectId;
        dates: Date[];
      }

      export type Date = {
        readonly in: Date;
        readonly out: Date;
        readonly state: "present" | "late";
      };

      export type Record = ModelRecord<Schema>;

      export interface Model extends Mongoose.Model<Schema> {
        /** Find one user's attendance records by userId */
        findUser(
          userId: string,
          projection?: Mongoose.ProjectionType<Schema> | null,
          options?: Mongoose.QueryOptions
        ): SQuery<Schema>;
        /** Find multiple users attendance records by userId */
        findUser(
          userId: string[],
          projection?: Mongoose.ProjectionType<Schema> | null,
          options?: Mongoose.QueryOptions
        ): SQuery<Schema[], Schema>;
        /**
         * Filter a range of dates for specific users
         *
         * @param userId User to find attendance record for
         * @param query The conditions to filter the attendance with
         */
        findUserRange(userId: string | string[], query: Mongoose.QuerySelector<Date>): AQuery<Pick<Schema, "dates">>;
      }
    }

    namespace Class {
      export interface Schema extends DocumentId {
        /** The class order. How it'll be sorted when fetched from DB */
        order: number;
        name: ThingName;
        createdAt: Date;
        teachers: ObjectId[];
      }

      export interface Virtuals {
        subjectsCount: number;
      }

      export type Record<V extends boolean | keyof Virtuals = false> = ModelRecord<Schema, Virtuals, V>;

      type PopulatedTeachers = { teachers: Teacher.Schema[] };

      export interface Model extends Mongoose.Model<Schema, unknown, unknown, Virtuals> {
        /** Find a class by any of it's long, short or special names */
        findByName(
          name: string,
          type: keyof ThingName,
          projection?: Mongoose.ProjectionType<Schema> | null,
          options?: Mongoose.QueryOptions
        ): SQuery<Schema, Schema, unknown, Virtuals>;
        /**
         * Get all the teachers linked to the class
         *
         * @param classId Class ID to get for
         * @param teacherProjection Select Teacher fields to return
         * @param options {@link Mongoose.QueryOptions}
         */
        getTeachers(
          classId: string,
          teacherProjection?: Mongoose.ProjectionType<Schema> | null,
          options?: Mongoose.QueryOptions
        ): SQuery<PopulatedTeachers, PopulatedTeachers, unknown, Virtuals>;
      }
    }

    namespace Subject {
      interface Schema {
        class: ObjectId;
        order: number;
        mandatory?: true;
        sessions?: ObjectId[];
      }

      interface Subject<T extends ModelNames.B_SUBJECT | ModelNames.G_SUBJECT> extends DocumentId, Schema {
        __type: T;
        name: ThingName;
      }

      export interface BaseSchema extends Subject<ModelNames.B_SUBJECT> {
        teachers: ObjectId[];
      }

      export interface BaseVirtuals {
        teachersCount: number;
      }

      export interface GroupSchema extends Subject<ModelNames.G_SUBJECT> {
        divisions: Array<Pick<BaseSchema, "_id" | "name" | "teachers">>;
      }

      export interface GroupVirtuals {
        divisionsCount: number;
      }

      export type Model = Mongoose.Model<BaseSchema | GroupSchema>;
      export type Record<V extends boolean = false> = ModelRecord<
        BaseRecord<V> | GroupRecord<V>,
        Partial<BaseVirtuals & GroupVirtuals>,
        V
      >;

      export type BaseModel = Mongoose.Model<BaseSchema>;
      export type BaseRecord<V extends boolean | keyof BaseVirtuals = false> = ModelRecord<BaseSchema, BaseVirtuals, V>;

      export type GroupModel = Mongoose.Model<GroupSchema>;
      export type GroupRecord<V extends boolean | keyof GroupVirtuals = false> = ModelRecord<
        GroupSchema,
        GroupVirtuals,
        V
      >;
    }

    namespace Session {
      export interface Schema extends DocumentId {
        current?: true;
        name: ThingName;
      }

      interface Virtuals {
        termsCount: number;
        terms: Array<Omit<Term.Schema, "session">>;
      }

      export type Record<V extends boolean | keyof Virtuals = false> = ModelRecord<Schema, Virtuals, V>;

      export interface Model extends Mongoose.Model<Schema, unknown, unknown, Virtuals> {
        /** Find the term record where `{ current: true }` */
        findCurrent(
          projection?: Mongoose.ProjectionType<Schema> | null,
          options?: Mongoose.QueryOptions
        ): SQuery<Schema, Schema, unknown, Virtuals>;
      }
    }

    namespace Term {
      export interface Schema extends DocumentId {
        current?: true;
        name: ThingName;
        session: ObjectId;
      }

      export type Record = ModelRecord<Schema>;

      export interface Model extends Mongoose.Model<Schema> {
        /** Find the term record where `{ current: true }` */
        findCurrent(
          projection?: Mongoose.ProjectionType<Schema> | null,
          options?: Mongoose.QueryOptions
        ): SQuery<Schema>;
      }
    }

    namespace User {
      export type Type = "parent" | "teacher" | "student";

      export interface Name extends Record<"initials" | "title" | "full" | "first" | "last", string> {
        other?: string;
        readonly username: string;
      }

      export interface Password {
        hash: string;
        salt: string;
      }

      export interface Images {
        cover?: string;
        avatar?: string;
      }

      export type SubContact = {
        primary: string;
        other?: string;
      };

      export type Contact = Record<"email" | "phone" | "address", Utils.FlattenIntersection<SubContact>>;

      export type Gender = "M" | "F";

      export interface Base extends DocumentId {
        dob?: Date;
        name: Name;
        images: Images;
        gender: Gender;
        contact: Contact;
        readonly schoolMail: string;
      }

      export interface Virtuals {
        password: Password;
      }

      export interface StaticMethods<S> {
        /** Find a user by username */
        findByUsername(
          username: string,
          projection?: Mongoose.ProjectionType<S> | null,
          options?: Mongoose.QueryOptions
        ): SQuery<S, S, unknown, Virtuals>;
        /** Find all users by username */
        findByUsername(
          username: string[],
          projection?: Mongoose.ProjectionType<S> | null,
          options?: Mongoose.QueryOptions
        ): SQuery<S[], S, unknown, Virtuals>;
        /** Find a user by school mail */
        findBySchoolMail(
          mail: string,
          projection?: Mongoose.ProjectionType<S> | null,
          options?: Mongoose.QueryOptions
        ): SQuery<S, S, unknown, Virtuals>;
        /** Find all users by schoolMail */
        findBySchoolMail(
          mail: string[],
          projection?: Mongoose.ProjectionType<S> | null,
          options?: Mongoose.QueryOptions
        ): SQuery<S[], S, unknown, Virtuals>;
      }
    }

    namespace Student {
      export interface Guardian {
        guardian: ObjectId;
        relation: "father" | "mother" | "other";
      }

      export interface Academic {
        term: ObjectId;
        class: ObjectId;
        subjects: ObjectId[];
      }

      export interface Schema extends User.Base {
        academic: Academic[];
        guardians: Guardian[];
      }

      export type Record<V extends boolean | keyof User.Virtuals = false> = ModelRecord<Schema, User.Virtuals, V>;

      export interface Model
        extends Mongoose.Model<Schema, unknown, unknown, User.Virtuals>,
          User.StaticMethods<Schema> {}
    }

    namespace Teacher {
      export type Schema = User.Base;

      export type Record<V extends boolean | keyof User.Virtuals = false> = ModelRecord<Schema, User.Virtuals, V>;

      export interface Model
        extends Mongoose.Model<Schema, unknown, unknown, User.Virtuals>,
          User.StaticMethods<Schema> {}
    }

    namespace Parent {
      export interface Schema extends User.Base {
        occupation: string;
      }

      export type Record<V extends boolean | keyof User.Virtuals = false> = ModelRecord<Schema, User.Virtuals, V>;

      export interface Model
        extends Mongoose.Model<Schema, unknown, unknown, User.Virtuals>,
          User.StaticMethods<Schema> {}
    }
  }
}
