import ifEmoji from "if-emoji";
import Flags from "country-flag-icons/react/3x2";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { useEffect, useState } from "react";

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
