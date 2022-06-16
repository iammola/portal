import type * as bson from "bson";
import type * as Mongoose from "mongoose";
import type { Day } from "date-fns";
import type { ModelNames } from "db/constants";

declare global {
  namespace Schemas {
    type DocumentId = Record<"_id", ObjectId>;
    type ObjectId = bson.ObjectId & Mongoose.Schema.Types.ObjectId;

    type AQuery<R> = Mongoose.Aggregate<R[]>;
    type SQuery<S, R = S, M = unknown, V = unknown> = Mongoose.Query<
      S extends Array<infer A> ? Array<Mongoose.HydratedDocument<A, M, V>> : Mongoose.HydratedDocument<S, M, V> | null,
      Mongoose.HydratedDocument<S, M, V>,
      unknown,
      R
    >;

    type ModelRecord<S, V = unknown, K extends boolean | keyof V = false> = S &
      (K extends true ? V : Utils.FlattenIntersection<K extends keyof V ? Pick<V, K> : unknown>);

    // Todo: Get a better neame than "Thing" for this type. Meant to group classes or subjects or terms or sessions
    type ThingName = {
      special?: string;
    } & Record<"long" | "short", string>;
  }

  namespace Schemas {
    namespace Attendance {
      type Schema = {
        userId: ObjectId;
        dates: Date[];
      } & DocumentId;

      type Date = {
        readonly in: Date;
        readonly out: Date;
        readonly state: "present" | "late";
      };

      type Record = ModelRecord<Schema>;

      type Model = {
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
      type Schema = {
        /** The class order. How it'll be sorted when fetched from DB */
        order: number;
        name: ThingName;
        createdAt: Date;
        teachers: ObjectId[];
      } & DocumentId;

      type Virtuals = {
        subjectsCount: number;
      };

      type Record<V extends boolean | keyof Virtuals = false> = ModelRecord<Schema, Virtuals, V>;

      type PopulatedTeachers = { teachers: Staff.TeacherSchema[] };

      type Model = {
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
        mandatory?: boolean;
      };

      type Schema<T extends ModelNames.B_SUBJECT | ModelNames.G_SUBJECT> = DocumentId & {
        __type: T;
        name: ThingName;
      } & Subject;

      type BaseSchema = {
        teachers: ObjectId[];
      } & Schema<ModelNames.B_SUBJECT>;

      type BaseVirtuals = {
        teachersCount: number;
      };

      type DivisionSchema = Pick<BaseSchema, "_id" | "name" | "teachers">;

      type GroupSchema = {
        divisions: DivisionSchema[];
      } & Schema<ModelNames.G_SUBJECT>;

      type GroupVirtuals = {
        divisionsCount: number;
      };

      type Model = Mongoose.Model<BaseSchema | GroupSchema>;
      type Record<V extends boolean = false> = ModelRecord<
        BaseRecord<V> | GroupRecord<V>,
        Partial<BaseVirtuals & GroupVirtuals>,
        V
      >;

      type BaseModel = Mongoose.Model<BaseSchema>;
      type BaseRecord<V extends boolean | keyof BaseVirtuals = false> = ModelRecord<BaseSchema, BaseVirtuals, V>;

      type GroupModel = Mongoose.Model<GroupSchema>;
      type GroupRecord<V extends boolean | keyof GroupVirtuals = false> = ModelRecord<GroupSchema, GroupVirtuals, V>;
    }

    namespace Session {
      type Schema = {
        name: ThingName;
      } & DocumentId;

      type Virtuals = {
        termsCount: number;
        terms: Array<Omit<Term.Schema, "session">>;
      };

      type Record<V extends boolean | keyof Virtuals = false> = ModelRecord<Schema, Virtuals, V>;

      type Model = {
        /** It's a static method that finds the session with the current term. */
        findCurrent(
          projection?: Mongoose.ProjectionType<Schema> | null,
          options?: Mongoose.QueryOptions
        ): Promise<Schema | null>;
      } & Mongoose.Model<Schema, unknown, unknown, Virtuals>;
    }

    namespace Term {
      type Schema = {
        name: ThingName;
        session: ObjectId;
        end: Date;
        start: Date;
      } & DocumentId;

      type Virtuals = {
        current: boolean;
      };

      type Record<V extends boolean | keyof Virtuals = false> = ModelRecord<Schema, Virtuals, V>;

      type Model = {
        /** It's a static method that finds the current term. */
        findCurrent(
          projection?: Mongoose.ProjectionType<Schema> | null,
          options?: Mongoose.QueryOptions
        ): SQuery<Schema>;
      } & Mongoose.Model<Schema>;
    }

    namespace User {
      type Type = "parent" | "teacher" | "student";

      type Name = {
        title?: string;
        other?: string;
        initials: string;
        last: string;
        full: string;
        first: string;
      };

      type Password = {
        hash: string;
        salt: string;
      };

      type Images = {
        cover?: string;
        avatar?: string;
      };

      type SubContact = {
        primary: string;
        other?: string;
      };

      type Contact = {
        email: SubContact;
        phone?: Partial<SubContact>;
        address?: Partial<SubContact>;
      };

      type Gender = "M" | "F";

      type Base = {
        dob?: Date;
        name: Name;
        images?: Images;
        gender: Gender;
        contact: Contact;
        readonly username: string;
        readonly schoolMail: string;
      } & DocumentId;

      type Virtuals = {
        password: Password;
      };

      type StaticMethods<S> = {
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
      type Guardian = {
        guardian: ObjectId;
        relation: "father" | "mother" | "other";
      };

      type Academic = {
        term: ObjectId;
        class: ObjectId;
        subjects: ObjectId[];
      };

      type Schema = {
        academic: Academic[];
        guardians: Guardian[];
      } & User.Base;

      type Record<V extends boolean | keyof User.Virtuals = false> = ModelRecord<Schema, User.Virtuals, V>;

      type Model = Mongoose.Model<Schema, unknown, unknown, User.Virtuals> & User.StaticMethods<Schema>;
    }

    namespace Staff {
      type Privilege = "a" | "u" | "u.sta" | "u.stu" | "s" | "s.cls" | "s.sts" | "s.cet";
      type Base = User.Base;

      type Schema<T> = {
        __type: T;
        /**
         * This is an array of privileges that the user has.
         *
         * ### All Privileges
         * - `a` - Access to all settings and other privileges
         *
         * ### User Privileges
         * - `u` - Create, Modify and Delete all types of users
         * - `u.sta` - Create, Modify and Delete all Staff
         * - `u.stu` - Create, Modify and Delete all Students
         *
         * ### Structure Privileges
         * This applies to classes, subjects, sessions, terms, calendar events and timetables
         *
         * - `s` - Create, Modify and Delete all types of structures
         * - `s.cls` - Create, Modify and Delete classes and subjects
         * - `s.sts` - Create, Modify and Delete sessions and terms
         * - `s.cet` - Create, Modify and Delete calendar events and timetables (Class Teacher can still add timetables for their class)
         */
        privileges: Privilege[];
      } & Base;

      type TeacherSchema = Schema<ModelNames.T_STAFF>;

      type Model = Mongoose.Model<TeacherSchema> & StaticMethods & User.StaticMethods<TeacherSchema>;
      type Record<V extends boolean | keyof User.Virtuals = false> = ModelRecord<TeacherRecord, User.Virtuals, V>;

      type TeacherModel = Mongoose.Model<TeacherSchema> & StaticMethods & User.StaticMethods<TeacherSchema>;
      type TeacherRecord = ModelRecord<TeacherSchema>;

      type StaticMethods = {
        /**
         * Check if a Staff has all the privileges specified
         * @param staffId Staff ID
         * @param privileges This is an array of privileges that the user has.
         *
         * ### All Privileges
         * - `a` - Access to all settings and other privileges
         *
         * ### User Privileges
         * - `u` - Create, Modify and Delete all types of users
         * - `u.sta` - Create, Modify and Delete all Staff
         * - `u.stu` - Create, Modify and Delete all Students
         *
         * ### Structure Privileges
         * This applies to classes, subjects, sessions, terms, calendar events and timetables
         *
         * - `s` - Create, Modify and Delete all types of structures
         * - `s.cls` - Create, Modify and Delete classes and subjects
         * - `s.sts` - Create, Modify and Delete sessions and terms
         * - `s.cet` - Create, Modify and Delete calendar events and timetables (Class Teacher can still add timetables for their class)
         */
        hasPrivileges(staffId: string | ObjectId, privileges: [Privilege, ...Privilege[]]): Promise<boolean>;
      };
    }

    namespace Parent {
      type Schema = {
        occupation: string;
      } & User.Base;

      type Record<V extends boolean | keyof User.Virtuals = false> = ModelRecord<Schema, User.Virtuals, V>;

      type Model = Mongoose.Model<Schema, unknown, unknown, User.Virtuals> & User.StaticMethods<Schema>;
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

      type Schema = {
        term: ObjectId;
        scores: Scores[];
        studentId: ObjectId;
      } & DocumentId;

      type Record = ModelRecord<Schema>;

      type Model = Mongoose.Model<Schema>;
    }

    namespace Settings {
      type SchoolTime = {
        days: Day[];
        value: Date;
      };

      type PeriodDurations = {
        min: number;
        max: number;
      };

      type Schema = {
        locked: boolean;
        activeSchoolDays: Day[];
        activeSchoolTime: {
          start: SchoolTime[];
          end: SchoolTime[];
        };
        periodDurations: {
          [K in Schemas.Calendar.TimetablePeriod["_type"]]: PeriodDurations;
        };
      } & DocumentId;

      type Record = ModelRecord<Schema>;

      type Model = Mongoose.Model<Schema>;
    }

    namespace Calendar {
      // The timetable can be changed a week,
      // A period lasts 45 minutes on a Monday-Thursday, and 35 mins on Friday.

      type Schema<T> = DocumentId & {
        __type: T;
      };

      type Model = Mongoose.Model<EventSchema | TimetableSchema>;
      type Record = ModelRecord<EventSchema | TimetableSchema>;

      type EventSchema = Schema<ModelNames.E_CALENDAR> & {
        title: string;
        start: Date;
        ends: Date;
        invitees?: {
          staff?: ObjectId[];
          parents?: ObjectId[];
          students?: ObjectId[];
        };
      };

      type EventModel = Mongoose.Model<EventSchema>;

      type EventRecord = ModelRecord<EventSchema>;

      type TimetablePeriod = {
        end: Date;
        start: Date;
      } & (
        | {
            _type: "subject";
            subject: ObjectId;
            teacher: ObjectId;
          }
        | {
            _type: "idle";
            title: string;
            description?: string;
          }
      );

      type TimetableDay = {
        day: Day;
        periods: TimetablePeriod[];
      };

      type TimetableSchema = Schema<ModelNames.T_CALENDAR> & {
        // Weekly timetable entry
        term: ObjectId;
        class: ObjectId;
        weeks: [number, ...number[]];
        days: TimetableDay[];
      };

      type TimetableModel = Mongoose.Model<TimetableSchema>;

      type TimetableRecord = ModelRecord<TimetableSchema>;
    }
  }
}
