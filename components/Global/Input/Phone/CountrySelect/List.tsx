import PhoneNumber from "awesome-phonenumber";
import { byIso } from "country-code-lookup";
import { FunctionComponent } from "react";

import { useCountryFlag } from "hooks";

const List: List = ({ className }) => {
    return (
        <ul className={className}>
            {PhoneNumber.getSupportedRegionCodes().map((regionCode) => (
                <List.Item
                    key={regionCode}
                    regionCode={regionCode}
                    className="flex flex-row gap-x-4 items-center justify-start p-2 rounded-xl hover:bg-slate-100"
                />
            ))}
        </ul>
    );
};

List.Item = function Item({ regionCode, className }) {
    const country = byIso(regionCode)?.country;
    const countryFlag = useCountryFlag(regionCode);
    const otherRegions = {
        AC: "Ascension Island",
        TA: "Tristan da Cunha",
        HL: "Saint Helena",
    };

    if (country === undefined && regionCode in otherRegions === false)
        console.warn(`No country data for ${regionCode} region`);

    return (
        <li className={className}>
            {countryFlag}
            <span className="text-sm font-medium">
                {country ?? otherRegions[regionCode as keyof typeof otherRegions]} (+
                {PhoneNumber.getCountryCodeForRegionCode(regionCode)})
            </span>
        </li>
    );
};

interface List extends FunctionComponent<{ className: string }> {
    Item: FunctionComponent<{
        className: string;
        regionCode: string;
    }>;
}

export default List;
