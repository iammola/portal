// can't export from "./file" or "./user" because the googleapis module is directly or indirectly imported
export * from "./api";
export * from "./hooks";
export * from "./password";

export const NETWORK_STATE = {
  online: { emoji: "😄", description: "Found the internet!" },
  offline: { emoji: "🤔", description: "Hmm... no internet?" },
};

export const JWT_ALG = "PS256";

export const JWT_COOKIE_KEY = "grs-jwt-k";

export const JWT_COOKIE_TOKEN = "grs-jwt-t";

export const USER_COOKIE = "grs-user";

export const PaginationLimit = 20;

/**
 * It takes a country code, converts it to uppercase, splits it into an array of characters, maps each
 * character to its corresponding code point, and then returns a string of the code points
 * @param {string} regionCode - The country code of the country you want to get the flag emoji for.
 * @returns An emoji for the country code passed in.
 */
export function getFlagEmoji(regionCode: string) {
  const codePoints = regionCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));

  return String.fromCodePoint(...codePoints);
}

/**
 * It takes an array of strings, arrays, and objects, and returns a string of all the truthy values
 * @param {CX[]} args - CX[]
 * @returns a string of class names.
 */
export function cx(...args: CX[]) {
  const classes = args.reduce<Array<string | string[]>>((acc, cur) => {
    let item: string | string[] = [];

    if (!cur) return acc;

    if (typeof cur === "string") item = cur;
    else if (Array.isArray(cur)) item = (cur[0] ? cur[1] : cur[2]) ?? [];
    else item = Object.keys(Object.fromEntries(Object.entries(cur ?? {}).filter((i) => i[1])));

    return item ? [...acc, item] : acc;
  }, []);

  return [...new Set(classes.flat())].join(" ").replace(/\s{2,}/g, " ");
}

type CX = undefined | null | false | string | [unknown, string, string?] | Record<string, unknown>;
