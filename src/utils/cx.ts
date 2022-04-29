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
