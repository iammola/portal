const DOMAIN = "fake.io";

/**
 * Generates an email address for a new user
 *
 * @todo Add actual code to create an email address
 *
 * @param username the user's username. should never be changed or reused
 * @returns the formatted email address
 */
export const generateSchoolMail = (username: string) => `${username}@${DOMAIN}`;
