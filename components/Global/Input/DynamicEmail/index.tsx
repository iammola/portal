import { FunctionComponent } from "react";

import Field from "./Field";

const DynamicEmail: DynamicEmail = ({ children, className }) => {
    return <div className={className}>{children}</div>;
};

DynamicEmail.Field = Field;

DynamicEmail.Label = ({ children, className }) => {
    return <span className={className}>{children}</span>;
};

type Label = FunctionComponent<{ className: string }>;

interface DynamicEmail extends FunctionComponent<{ className?: string }> {
    Field: Field;
    Label: Label;
}

export default DynamicEmail;
export type { Value } from "./Badge";
