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
    export type ThingName = {
      special?: string;
    } & Record<"long" | "short", string>;
  }

  namespace Schemas {
    namespace Attendance {
      export type Schema = {
        userId: ObjectId;
        dates: Date[];
      } & DocumentId;

      export type Date = {
        readonly in: Date;
        readonly out: Date;
        readonly state: "present" | "late";
      };

      export type Record = ModelRecord<Schema>;

      export type Model = {
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
      } & Mongoose.Model<Schema>;
    }

    namespace Class {
      export type Schema = {
        /** The class order. How it'll be sorted when fetched from DB */
        order: number;
        name: ThingName;
        createdAt: Date;
        teachers: ObjectId[];
      } & DocumentId;

      export type Virtuals = {
        subjectsCount: number;
      };

      export type Record<V extends boolean | keyof Virtuals = false> = ModelRecord<Schema, Virtuals, V>;

      type PopulatedTeachers = { teachers: Teacher.Schema[] };

      export type Model = {
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
      } & Mongoose.Model<Schema, unknown, unknown, Virtuals>;
    }

    namespace Subject {
      type Subject = {
        class: ObjectId;
        order: number;
        mandatory?: true;
      };

      type Schema<T extends ModelNames.B_SUBJECT | ModelNames.G_SUBJECT> = DocumentId & {
        __type: T;
        name: ThingName;
      } & Subject;

      export type BaseSchema = {
        teachers: ObjectId[];
      } & Schema<ModelNames.B_SUBJECT>;

      export type BaseVirtuals = {
        teachersCount: number;
      };

      export type DivisionSchema = Pick<BaseSchema, "_id" | "name" | "teachers">;

      export type GroupSchema = {
        divisions: DivisionSchema[];
      } & Schema<ModelNames.G_SUBJECT>;

      export type GroupVirtuals = {
        divisionsCount: number;
      };

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
      export type Schema = {
        current?: true;
        name: ThingName;
      } & DocumentId;

      type Virtuals = {
        termsCount: number;
        terms: Array<Omit<Term.Schema, "session">>;
      };

      export type Record<V extends boolean | keyof Virtuals = false> = ModelRecord<Schema, Virtuals, V>;

      export type Model = {
        /** Find the term record where `{ current: true }` */
        findCurrent(
          projection?: Mongoose.ProjectionType<Schema> | null,
          options?: Mongoose.QueryOptions
        ): SQuery<Schema, Schema, unknown, Virtuals>;
      } & Mongoose.Model<Schema, unknown, unknown, Virtuals>;
    }

    namespace Term {
      export type Schema = {
        current?: true;
        name: ThingName;
        session: ObjectId;
        end?: Date;
        start: Date;
      } & DocumentId;

      export type Record = ModelRecord<Schema>;

      export type Model = {
        /** Find the term record where `{ current: true }` */
        findCurrent(
          projection?: Mongoose.ProjectionType<Schema> | null,
          options?: Mongoose.QueryOptions
        ): SQuery<Schema>;
      } & Mongoose.Model<Schema>;
    }

    namespace User {
      export type Type = "parent" | "teacher" | "student";

      export type Name = {
        other?: string;
      } & Record<"initials" | "title" | "full" | "first" | "last", string>;

      export type Password = {
        hash: string;
        salt: string;
      };

      export type Images = {
        cover?: string;
        avatar?: string;
      };

      export type SubContact = {
        primary: string;
        other?: string;
      };

      export type Contact = {
        email: SubContact;
        phone?: Partial<SubContact>;
        address?: Partial<SubContact>;
      };

      export type Gender = "M" | "F";

      export type Base = {
        dob?: Date;
        name: Name;
        images?: Images;
        gender: Gender;
        contact: Contact;
        readonly username: string;
        readonly schoolMail: string;
      } & DocumentId;

      export type Virtuals = {
        password: Password;
      };

      export type StaticMethods<S> = {
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
      };
    }

    namespace Student {
      export type Guardian = {
        guardian: ObjectId;
        relation: "father" | "mother" | "other";
      };

      export type Academic = {
        term: ObjectId;
        class: ObjectId;
        subjects: ObjectId[];
      };

      export type Schema = {
        academic: Academic[];
        guardians: Guardian[];
      } & User.Base;

      export type Record<V extends boolean | keyof User.Virtuals = false> = ModelRecord<Schema, User.Virtuals, V>;

      export type Model = Mongoose.Model<Schema, unknown, unknown, User.Virtuals> & User.StaticMethods<Schema>;
    }

    namespace Teacher {
      export type Schema = User.Base;

      export type Record<V extends boolean | keyof User.Virtuals = false> = ModelRecord<Schema, User.Virtuals, V>;

      export type Model = Mongoose.Model<Schema, unknown, unknown, User.Virtuals> & User.StaticMethods<Schema>;
    }

    namespace Parent {
      export type Schema = {
        occupation: string;
      } & User.Base;

      export type Record<V extends boolean | keyof User.Virtuals = false> = ModelRecord<Schema, User.Virtuals, V>;

      export type Model = Mongoose.Model<Schema, unknown, unknown, User.Virtuals> & User.StaticMethods<Schema>;
    }

    namespace Result {
      type Score = {
        score: number;
        fieldId: ObjectId;
      };

      type Scores = {
        data?: Score[];
        subject: ObjectId;
        forcedTotal?: number;
      };

      export type Schema = {
        term: ObjectId;
        scores: Scores[];
        studentId: ObjectId;
      } & DocumentId;

      export type Record = ModelRecord<Schema>;

      export type Model = Mongoose.Model<Schema>;
    }
  }
}
