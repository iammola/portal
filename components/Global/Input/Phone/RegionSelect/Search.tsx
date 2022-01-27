import { SearchIcon } from "@heroicons/react/outline";
import { FunctionComponent, useEffect, useRef } from "react";

const Search: Search = ({ className, handleSearch, search, visible }) => {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        visible && setTimeout(() => ref.current?.focus(), 0);
    }, [visible]);

    return (
        <div className={className}>
            <SearchIcon className="w-6 h-6 stroke-slate-700" />
            <input
                ref={ref}
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
    visible: boolean;
    className: string;
    handleSearch(search: string): void;
}>;

export default Search;
