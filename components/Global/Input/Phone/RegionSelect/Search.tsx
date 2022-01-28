import { SearchIcon } from "@heroicons/react/outline";
import { FunctionComponent, useEffect, useRef } from "react";

const Search: Search = ({ className, handleSearch, search, visible }) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    visible && setTimeout(() => ref.current?.focus(), 0);
  }, [visible]);

  return (
    <div className={className}>
      <SearchIcon className="h-6 w-6 stroke-slate-700" />
      <input
        ref={ref}
        value={search}
        placeholder="Search"
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full grow p-2 font-medium text-slate-700 focus:outline-none"
      />
    </div>
  );
};

type Search = FunctionComponent<{
  search: string;
  visible: boolean;
  className: string;
  handleSearch(search: string): void;
}>;

export default Search;
