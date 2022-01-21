import { FunctionComponent } from "react";

import Field from "./Field";
import Label from "./Label";

const DynamicEmail: DynamicEmail = ({ children, className }) => {
    return <div className={className}>{children}</div>;
};

DynamicEmail.Field = Field;
DynamicEmail.Label = Label;

interface DynamicEmail extends FunctionComponent<{ className?: string }> {
    Field: Field;
    Label: Label;
}

export default DynamicEmail;
export type { Value } from "./Badge";
