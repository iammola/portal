import { FunctionComponent } from "react";

import List from "./List";

const CountrySelect: CountrySelect = ({ className, onRegionChange, selectedRegion, visible }) => {
    return (
        <div className={className}>
            <List
                {...{ visible, selectedRegion }}
                handleRegionChange={onRegionChange}
                className="grow w-full py-2 space-y-1 overflow-x-hidden overflow-y-auto"
            />
        </div>
    );
};

type CountrySelect = FunctionComponent<{
    visible: boolean;
    className: string;
    selectedRegion: string;
    onRegionChange(regionCode: string): void;
}>;

export default CountrySelect;
