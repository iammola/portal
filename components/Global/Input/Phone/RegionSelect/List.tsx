import { FunctionComponent, useEffect, useMemo, useRef } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import PhoneNumber from "awesome-phonenumber";
import { byIso } from "country-code-lookup";

import { useCountryFlag } from "hooks";
import { classNames } from "utils";

const List: List = ({ className, handleRegionChange, selectedRegion, visible }) => {
    const otherRegions = useMemo<{ [k: string]: string | undefined }>(
        () => ({
            AC: "Ascension Island",
            TA: "Tristan da Cunha",
            HL: "Saint Helena",
        }),
        []
    );
    const regions = PhoneNumber.getSupportedRegionCodes().map(
        (region) => [region, byIso(region)?.country ?? otherRegions[region]] as const
    );

    return (
        <ul className={className}>
            {regions.map(([regionCode, country]) => (
                <List.Item
                    key={regionCode}
                    {...{ country, regionCode, visible }}
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

List.Item = function Item({ country, regionCode, className, onClick, selected, visible }) {
    const ref = useRef<
        HTMLLIElement & { scrollIntoViewIfNeeded?: (centerIfNeeded?: boolean) => void }
    >(null);
    const countryFlag = useCountryFlag(regionCode);

    useEffect(() => {
        if (selected === true && visible === true) {
            ref.current?.scrollIntoViewIfNeeded?.() ??
                ref.current?.parentElement?.scroll(
                    0,
                    ref.current?.offsetTop - ref.current?.parentElement?.offsetHeight / 2.6
                );
            ref.current?.focus();
        }
    }, [selected, visible]);

    useEffect(() => {
        if (country === undefined) console.warn(`No country data for ${regionCode} region`);
    }, [country, regionCode]);

    return (
        <li ref={ref} tabIndex={0} onClick={onClick} className={className(selected)}>
            {countryFlag}
            <span className="text-sm text-slate-700 font-medium">
                {country} (+{PhoneNumber.getCountryCodeForRegionCode(regionCode)})
            </span>
            {selected === true && <CheckIcon className="w-5 h-5 text-slate-800 ml-auto mr-2" />}
        </li>
    );
};

type ListProps = {
    visible: boolean;
    className: string;
    selectedRegion: string;
    handleRegionChange(regionCode: string): void;
};

interface List extends FunctionComponent<ListProps> {
    Item: FunctionComponent<{
        country?: string;
        visible: boolean;
        selected: boolean;
        regionCode: string;
        onClick(): void;
        className: (selected: boolean) => string;
    }>;
}

export default List;
