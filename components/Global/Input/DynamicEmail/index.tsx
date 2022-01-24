import { FunctionComponent } from "react";

import Field from "./Field";

const DynamicEmail: DynamicEmail = ({ children, className }) => {
    return <div className={className}>{children}</div>;
};

DynamicEmail.Field = Field;

DynamicEmail.Label = ({ children, className }) => {
    return <span className={className}>{children}</span>;
};

interface DynamicEmail extends FunctionComponent<{ className?: string }> {
    Field: Field;
    Label: FunctionComponent<{ className: string }>;
}

export default DynamicEmail;
export type { Value } from "./Badge";
