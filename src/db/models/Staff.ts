import { model, models } from "mongoose";

import { ModelNames } from "db";
import { createUserSchema } from "db/schema/User";
import { TeacherStaffSchema } from "db/schema/Staff";

const StaffSchema = createUserSchema<Omit<Schemas.Staff.Record, "__type">>(
  {
    privileges: {
      type: [String],
      enum: ["a", "u", "u.sta", "u.stu", "s", "s.cls", "s.sts", "s.cet"],
    },
  },
  { discriminatorKey: "__type" }
);

StaffSchema.static(
  "hasPrivileges",
  async function (_id: string | Schemas.ObjectId, privileges: Schemas.Staff.Record["privileges"]) {
    /**
     * It takes an array of privileges, groups it to match all privileges if it includes `a`,
     * to it's own global scope if it includes its global flag or it's sub scopes and
     * returns a regular expression that'll match any of the privileges given in the array
     * @returns A regular expression that matches the privileges.
     */
    function trimPrivileges() {
      if (privileges.includes("a")) privileges = ["a"];

      const trimmed = privileges.reduce<Record<string, string | string[]>>((acc, b) => {
        const [, global, sub] = b.match(/^([a-z])(?:\.([a-z]{3}))?$/) ?? [];
        if (global === undefined) return acc;

        let group = acc[global] ?? [];

        if (sub) {
          if (typeof group === "string") return acc;
          group.push(sub);
        } else group = global;

        return { ...acc, [global]: group };
      }, {});

      const regex = Object.entries(trimmed).reduce<string[]>((acc, [global, sub]) => {
        if (typeof sub === "string") return [...acc, `^${global}$`];
        return [...acc, `^${global}(\\.(${sub.join("|")}))?$`];
      }, []);

      return new RegExp(regex.join("|"));
    }

    const staff = await this.exists({ _id, privileges: trimPrivileges() });
    return !!staff;
  }
);

export const StaffModel = (models[ModelNames.STAFF] ?? model(ModelNames.STAFF, StaffSchema)) as Schemas.Staff.Model;

export const TeacherStaffModel = (StaffModel.discriminators?.[ModelNames.T_STAFF] ??
  StaffModel.discriminator(ModelNames.T_STAFF, TeacherStaffSchema)) as Schemas.Staff.TeacherModel;
