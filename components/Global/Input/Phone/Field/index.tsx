import { FunctionComponent } from "react";

const Field: Field = ({ className }) => {
    return <div className={className}></div>;
};

type Field = FunctionComponent<{
    value: string;
    className: string;
    countryCode?: string;
    onChange(val: string): void;
}>;

export default Field;
