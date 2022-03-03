import { Document } from "mongoose";

import type { UserBase } from "types/schema";

/**
 * Creates an email address with the user's username
 *
 * @todo Add actual code to create an email address
 *
 * @returns the email address
 */
export function generateSchoolMail(this: UserBase & Document) {
  const DOMAIN = "fake.io";
  if (this instanceof Document && this.isNew)
    return `${this.name.username}@${DOMAIN}`;
}
