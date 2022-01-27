import { FunctionComponent } from "react";

const Search: Search = () => {
    return <></>;
};

type Search = FunctionComponent<{
    search: string;
    className: string;
    handleSearch(search: string): void;
}>;

export default Search;
