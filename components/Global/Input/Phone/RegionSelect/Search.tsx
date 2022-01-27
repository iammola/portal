import { SearchIcon } from "@heroicons/react/outline";
import { FunctionComponent } from "react";

const Search: Search = ({ className, handleSearch, search }) => {
    return (
        <div className={className}>
            <SearchIcon className="w-6 h-6 stroke-slate-700" />
            <input
                value={search}
                placeholder="Search"
                onChange={(e) => handleSearch(e.target.value)}
                className="grow w-full p-2 text-slate-700 font-medium focus:outline-none"
            />
        </div>
    );
};

type Search = FunctionComponent<{
    search: string;
    className: string;
    handleSearch(search: string): void;
}>;

export default Search;
