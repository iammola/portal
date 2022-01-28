import { FunctionComponent, useState } from "react";

import { classNames } from "utils";

import List from "./List";
import Search from "./Search";

const RegionSelect: RegionSelect = ({
  onRegionChange,
  selectedRegion,
  visible,
}) => {
  const [search, setSearch] = useState("");

  return (
    <div
      className={classNames(
        "flex flex-col items-start justify-start w-full max-h-[13.5rem] mt-2 px-2 absolute top-full left-0 z-[1000] rounded-xl shadow-lg overflow-hidden bg-white border border-slate-200 divide-y divide-slate-200",
        [visible, "", "opacity-0 invisible pointer-events-none"]
      )}
    >
      <Search
        {...{ search, visible }}
        handleSearch={setSearch}
        className="flex flex-row gap-x-2 items-center justify-start grow w-full py-2 px-3.5"
      />
      <List
        handleRegionChange={onRegionChange}
        {...{ visible, search, selectedRegion }}
        className="grow w-full py-2 space-y-1 overflow-x-hidden overflow-y-auto"
      />
    </div>
  );
};

type RegionSelect = FunctionComponent<{
  visible: boolean;
  selectedRegion: string;
  onRegionChange(regionCode: string): void;
}>;

export default RegionSelect;
