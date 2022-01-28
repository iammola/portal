import { FunctionComponent } from "react";

import Field from "./Field";

const DateInput: DateInput = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

DateInput.Field = Field;

DateInput.Label = ({ children, className }) => {
  return <span className={className}>{children}</span>;
};

interface DateInput extends FunctionComponent<{ className: string }> {
  Field: Field;
  Label: FunctionComponent<{ className: string }>;
}

export default DateInput;
