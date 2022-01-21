import { FunctionComponent } from "react";

const Textarea: Textarea = () => {
    return <div className="relative grid gap-x-2 items-center w-full"></div>;
};

type Textarea = FunctionComponent<{
    className: string | ((valid?: boolean) => string);
    onChange(v: string): void;
    required?: boolean;
    value?: string;
    label: string;
    id: string;
}>;

export default Textarea;
