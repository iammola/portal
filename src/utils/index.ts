// can't export from "./file" or "./user" because the googleapis module is directly or indirectly imported
export * from "./cx";
export * from "./api";
export * from "./hooks";
export * from "./password";
export * from "./constants";

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
