import { useEffect, useRef } from "react";

/**
 * @see https://stackoverflow.com/a/51082563/15350139
 * @param dependencies - Values you want to track
 */
export function useTraceUpdate(dependencies: Record<string, unknown>) {
  const prev = useRef(dependencies);

  useEffect(() => {
    const changed = Object.entries(dependencies).reduce(
      (a, b) =>
        Object.assign(
          a,
          prev.current[b[0]] !== b[1] && {
            [b[0]]: [prev.current[b[0]], b[1]],
          }
        ),
      {}
    );
    if (Object.keys(changed).length > 0) console.warn("Changed Deps:", changed);
    prev.current = dependencies;
  });
}
