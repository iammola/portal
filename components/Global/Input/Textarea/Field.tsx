import { FunctionComponent } from "react";

const Field: Field = () => {
    return <textarea />;
};

type Field = FunctionComponent<{
    value: string;
    onChange(values: string): void;
    className: string | ((valid?: boolean) => string);
}>;

export default Field;
