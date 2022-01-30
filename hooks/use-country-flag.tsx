import ifEmoji from "if-emoji";
import { useEffect, useState } from "react";
import Flags from "country-flag-icons/react/3x2";
import getCountryFlag from "country-flag-icons/unicode";

export function useCountryFlag(regionCode: string) {
  const [countryFlag, setCountryFlag] = useState<JSX.Element>();

  useEffect(() => {
    if (!regionCode) return;
    const emoji = getCountryFlag(regionCode);
    const Icon = Flags[regionCode as keyof typeof Flags] ?? <></>;

    setCountryFlag(
      ifEmoji(emoji) ? (
        <span className="text-xl">{emoji}</span>
      ) : (
        <Icon className="h-7 w-[25px]" />
      )
    );
  }, [regionCode]);

  return countryFlag;
}
