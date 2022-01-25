import PhoneNumber from "awesome-phonenumber";
import { FunctionComponent } from "react";

const List: List = ({ className }) => {
    return (
        <ul className={className}>
            {PhoneNumber.getSupportedRegionCodes().map((regionCode) => (
                <List.Item
                    key={regionCode}
                    regionCode={regionCode}
                    className="flex flex-row gap-x-4 items-center justify-start p-2"
                />
            ))}
        </ul>
    );
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
