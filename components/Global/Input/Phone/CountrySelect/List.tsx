import PhoneNumber from "awesome-phonenumber";
import { FunctionComponent } from "react";

import { useCountryFlag } from "hooks";

const List: List = ({ className }) => {
    return (
        <ul className={className}>
            {PhoneNumber.getSupportedRegionCodes().map((regionCode) => (
                <List.Item
                    key={regionCode}
                    regionCode={regionCode}
                    className="flex flex-row gap-x-4 items-center justify-start p-2"
                />
            ))}
        </ul>
    );
};

List.Item = function Item({ regionCode, className }) {
    const countryFlag = useCountryFlag(regionCode);

    return <li className={className}>{countryFlag}</li>;
};

interface List extends FunctionComponent<{ className: string }> {
    Item: FunctionComponent<{
        className: string;
        regionCode: string;
    }>;
}

export default List;
