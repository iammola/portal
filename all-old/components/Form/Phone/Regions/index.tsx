import { useRef, useState } from "react";

import { classNames } from "utils";

import List from "./List";
import Search from "./Search";

const Regions: Regions = ({ onBlur, onRegionChange, selectedRegion, visible }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");

  const handleBlur = (e: FocusEvent) => !ref.current?.contains(e.relatedTarget as Node) && onBlur();

  return (
    <div
      ref={ref}
      className={classNames(
        "divide-slate-200 border-slate-200 absolute top-full left-0 z-[1000] mt-2 flex max-h-[13.5rem] w-full flex-col items-start justify-start divide-y overflow-hidden rounded-xl border bg-white px-2 shadow-lg",
        [visible, "", "pointer-events-none invisible opacity-0"]
      )}
    >
      <Search
        handleSearch={setSearch}
        {...{ handleBlur, search, visible }}
        className="flex w-full grow flex-row items-center justify-start gap-x-2 py-2 px-3.5"
      />
      <List
        handleRegionChange={onRegionChange}
        {...{ handleBlur, search, selectedRegion, visible }}
        className="w-full grow space-y-1 overflow-y-auto overflow-x-hidden py-2"
      />
    </div>
  );
};

type Regions = React.FC<{
  onBlur(): void;
  visible: boolean;
  selectedRegion: string;
  onRegionChange(regionCode: string): void;
}>;

export default Regions;
