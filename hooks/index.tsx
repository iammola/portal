import ifEmoji from "if-emoji";
import Flags from "country-flag-icons/react/3x2";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { useEffect, useRef, useState } from "react";

export function useIsChanging<V>(value: V) {
  const [changing, setChanging] = useState(false);

  useEffect(() => {
    setChanging(true);
    const timeout = setTimeout(setChanging, 750, false);
    return () => clearTimeout(timeout);
  }, [value]);

  return changing;
}

export function useCountryFlag(regionCode: string) {
  const [countryFlag, setCountryFlag] = useState<JSX.Element>();

  useEffect(() => {
    if (!regionCode) return;
    const emoji = getUnicodeFlagIcon(regionCode);
    const Icon = Flags[regionCode as keyof typeof Flags] ?? <></>;

    setCountryFlag(
      ifEmoji(emoji) ? (
        <span className="text-xl">{emoji}</span>
      ) : (
        <Icon className="w-[25px] h-7" />
      )
    );
  }, [regionCode]);

  return countryFlag;
}

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
          prev.current[b[0]] !== b[1] && { [b[0]]: [prev.current[b[0]], b[1]] }
        ),
      {}
    );
    if (Object.keys(changed).length > 0) console.warn("Changed Deps:", changed);
    prev.current = dependencies;
  });
}
