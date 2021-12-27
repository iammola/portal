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
) =>
    classes
        .reduce((acc: string[], cur) => {
            let classes = "";

            if (typeof cur === "string") classes = cur;
            else if (Array.isArray(cur)) classes = cur[0] ? cur[1] : cur[2];
            else
                classes = Object.keys(
                    Object.fromEntries(Object.entries(cur ?? {}).filter((i) => i[1]))
                ).join(" ");

            return [...acc, classes];
        }, [])
        .join(" ");
