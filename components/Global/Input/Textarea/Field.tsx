import { FunctionComponent } from "react";

const Field: Field = ({ value, onChange }) => {
    return <textarea value={value} onChange={(e) => onChange(e.target.value)} />;
};

type Field = FunctionComponent<{
    value: string;
    onChange(values: string): void;
    className: string | ((valid?: boolean) => string);
}>;

export default Field;
