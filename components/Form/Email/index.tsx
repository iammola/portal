import { FunctionComponent } from "react";

import Field from "./Field";

const Email: Email = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

Email.Field = Field;

Email.Label = ({ children, className }) => {
  return <span className={className}>{children}</span>;
};

interface Email extends FunctionComponent<{ className?: string }> {
  Field: Field;
  Label: FunctionComponent<{ className: string }>;
}

export default Email;
export type { Value } from "./Badge";
