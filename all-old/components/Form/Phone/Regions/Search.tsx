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
      <SearchIcon className="stroke-slate-700 h-6 w-6" />
      <input
        ref={ref}
        value={search}
        placeholder="Search"
        onChange={(e) => handleSearch(e.target.value)}
        className="text-slate-700 w-full grow p-2 font-medium focus:outline-none"
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
