import { FunctionComponent, useEffect, useRef } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import PhoneNumber from "awesome-phonenumber";
import { byIso } from "country-code-lookup";

import { useCountryFlag } from "hooks";
import { classNames } from "utils";

const List: List = ({ className, selectedRegion }) => {
    return (
        <ul className={className}>
            {PhoneNumber.getSupportedRegionCodes().map((regionCode) => (
                <List.Item
                    key={regionCode}
                    regionCode={regionCode}
                    selected={regionCode === selectedRegion}
                    className={(selected) =>
                        classNames(
                            "flex flex-row gap-x-4 items-center justify-start p-2 rounded-xl",
                            {
                                "hover:bg-slate-100": selected === false,
                                "bg-slate-100 hover:bg-slate-200": selected === true,
                            }
                        )
                    }
                />
            ))}
        </ul>
    );
};

List.Item = function Item({ regionCode, className, selected }) {
    const ref = useRef<
        HTMLLIElement & { scrollIntoViewIfNeeded?: (centerIfNeeded?: boolean) => void }
    >(null);
    const country = byIso(regionCode)?.country;
    const countryFlag = useCountryFlag(regionCode);
    const otherRegions = {
        AC: "Ascension Island",
        TA: "Tristan da Cunha",
        HL: "Saint Helena",
    };

    useEffect(() => {
        if (selected === true)
            ref.current?.scrollIntoViewIfNeeded?.() ??
                ref.current?.parentElement?.scroll(
                    0,
                    ref.current?.offsetTop - ref.current?.parentElement?.offsetHeight / 2.6
                );
    }, [selected]);

    if (country === undefined && regionCode in otherRegions === false)
        console.warn(`No country data for ${regionCode} region`);

    return (
        <li ref={ref} className={className(selected)}>
            {countryFlag}
            <span className="text-sm text-slate-700 font-medium">
                {country ?? otherRegions[regionCode as keyof typeof otherRegions]} (+
                {PhoneNumber.getCountryCodeForRegionCode(regionCode)})
            </span>
            {selected === true && <CheckIcon className="w-5 h-5 text-slate-800 ml-auto mr-2" />}
        </li>
    );
};

interface List extends FunctionComponent<{ className: string; selectedRegion: string }> {
    Item: FunctionComponent<{
        selected: boolean;
        regionCode: string;
        className: (selected: boolean) => string;
    }>;
}

export default List;
