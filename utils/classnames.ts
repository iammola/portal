/**
 * Utility function for conditionally generating class names
 *
 * @example
 *
 * ```jsx
 * const className = classNames(
 *   "text-white",
 *   [isValid, "bg-green", "bg-red"],
 *   { "display-none": isDisabled }
 * )
 *
 * <div className={className}>
 *   My Div
 * </div>
 * ```
 *
 * @param args Array of classes you want formatted
 * @returns the formatted classes string
 */
export const classNames = (...args: C[]) => {
  return [
    ...new Set(
      args.reduce((acc: string[], cur) => {
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
  ]
    .filter(Boolean)
    .join(" ")
    .replace(/\s{2,}/g, " ");
};

type C = undefined | null | string | [unknown, string, string] | Record<string, unknown>;
