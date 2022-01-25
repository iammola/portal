import { FunctionComponent } from "react";

import List from "./List";

const CountrySelect: CountrySelect = ({ onRegionChange, selectedRegion }) => {
    return (
        <div className="flex flex-col items-start justify-start w-full h-[13.5rem] mt-2 px-2 absolute top-full left-0 rounded-xl shadow-lg overflow-hidden bg-white border border-slate-200 divide-y divide-slate-200">
            <List
                selectedRegion={selectedRegion}
                handleRegionChange={onRegionChange}
                className="grow w-full py-2 space-y-1 overflow-x-hidden overflow-y-auto"
            />
        </div>
    );
};

type CountrySelect = FunctionComponent<{
    selectedRegion: string;
    onRegionChange(regionCode: string): void;
}>;

export default CountrySelect;
