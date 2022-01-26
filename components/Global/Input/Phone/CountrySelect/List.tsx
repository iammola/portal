import { FunctionComponent, useEffect, useRef } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import PhoneNumber from "awesome-phonenumber";
import { byIso } from "country-code-lookup";

import { useCountryFlag } from "hooks";
import { classNames } from "utils";

const List: List = ({ className, handleRegionChange, selectedRegion }) => {
    return (
        <ul className={className}>
            {PhoneNumber.getSupportedRegionCodes().map((regionCode) => (
                <List.Item
                    key={regionCode}
                    regionCode={regionCode}
                    selected={regionCode === selectedRegion}
                    onClick={() => handleRegionChange(regionCode)}
                    className={(selected) =>
                        classNames(
                            "flex flex-row gap-x-4 items-center justify-start p-2 rounded-xl cursor-pointer hover:bg-slate-100 focus:outline-none",
                            [selected, "focus:bg-slate-50", ""]
                        )
                    }
                />
            ))}
        </ul>
    );
};

List.Item = function Item({ regionCode, className, onClick, selected }) {
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
        if (selected === true) {
            ref.current?.scrollIntoViewIfNeeded?.() ??
                ref.current?.parentElement?.scroll(
                    0,
                    ref.current?.offsetTop - ref.current?.parentElement?.offsetHeight / 2.6
                );
            ref.current?.focus();
        }
    }, [selected]);

    if (country === undefined && regionCode in otherRegions === false)
        console.warn(`No country data for ${regionCode} region`);

    return (
        <li ref={ref} tabIndex={0} onClick={onClick} className={className(selected)}>
            {countryFlag}
            <span className="text-sm text-slate-700 font-medium">
                {country ?? otherRegions[regionCode as keyof typeof otherRegions]} (+
                {PhoneNumber.getCountryCodeForRegionCode(regionCode)})
            </span>
            {selected === true && <CheckIcon className="w-5 h-5 text-slate-800 ml-auto mr-2" />}
        </li>
    );
};

type ListProps = {
    className: string;
    selectedRegion: string;
    handleRegionChange(regionCode: string): void;
};

interface List extends FunctionComponent<ListProps> {
    Item: FunctionComponent<{
        selected: boolean;
        regionCode: string;
        onClick(): void;
        className: (selected: boolean) => string;
    }>;
}

export default List;