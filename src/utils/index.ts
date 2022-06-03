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
 * @param args - array of strings, arrays, and objects
 * @returns a string of class names.
 */
export function cx(
  ...args: Array<undefined | null | false | string | [unknown, string, string?] | Record<string, unknown>>
) {
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
