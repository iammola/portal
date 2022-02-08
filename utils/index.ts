/**
 * @param classes strings you want to add to final string
 * @returns all the valid strings
 */
export const classNames = (
  ...classes: (
    | undefined
    | null
    | string
    | [boolean, string, string]
    | { [key: string]: boolean }
  )[]
) => {
  const formattedClasses = [
    ...new Set(
      classes.reduce((acc: string[], cur) => {
        let classes = "";

        if (typeof cur === "string") classes = cur;
        else if (Array.isArray(cur)) classes = cur[0] ? cur[1] : cur[2];
        else
          classes = Object.keys(
            Object.fromEntries(Object.entries(cur ?? {}).filter((i) => i[1]))
          ).join(" ");

        return [...acc, classes];
      }, [])
    ),
  ];

  const filtered = formattedClasses?.filter?.(Boolean);
  const joined = filtered?.join?.(" ");
  const replaced = joined?.replaceAll?.(/\s{2,}/g, " ") as string | undefined;

  if (
    [classes, formattedClasses, filtered, joined, replaced].includes(undefined)
  )
    // eslint-disable-next-line no-console
    console.log({ classes, formattedClasses, filtered, joined, replaced });
  return replaced as string;
};
