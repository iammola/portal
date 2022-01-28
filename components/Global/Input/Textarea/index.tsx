import { FunctionComponent } from "react";

import Field from "./Field";

const Textarea: Textarea = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

Textarea.Field = Field;

Textarea.Label = ({ children, className }) => {
  return <span className={className}>{children}</span>;
};

interface Textarea extends FunctionComponent<{ className?: string }> {
  Field: Field;
  Label: FunctionComponent<{ className: string }>;
}

export default Textarea;
