import { FunctionComponent } from "react";

const List: List = ({ children, className }) => {
    return <ul className={className}>{children}</ul>;
};

List.Item = () => {
    return <></>;
};

interface List extends FunctionComponent<{ className: string }> {
    Item: FunctionComponent<{
        className: string;
        regionCode: string;
    }>;
}

export default List;
