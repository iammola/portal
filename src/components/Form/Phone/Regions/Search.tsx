import { SearchIcon } from "@heroicons/react/outline";
import { useEffect, useRef } from "react";

const Search: Search = ({ className, handleBlur, handleSearch, search, visible }) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (visible) {
      ref.current?.focus();
      ref.current?.addEventListener("blur", handleBlur, { once: true });
    } else handleSearch("");
  }, [handleBlur, handleSearch, visible]);

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

type Search = React.FC<{
  search: string;
  visible: boolean;
  className: string;
  handleBlur(e: FocusEvent): void;
  handleSearch(search: string): void;
}>;

export default Search;
