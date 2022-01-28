import { FunctionComponent } from "react";

import Field from "./Field";

const PhoneInput: PhoneInput = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

PhoneInput.Field = Field;

PhoneInput.Label = ({ children, className }) => {
  return <span className={className}>{children}</span>;
};

interface PhoneInput extends FunctionComponent<{ className: string }> {
  Field: Field;
  Label: FunctionComponent<{ className: string }>;
}

export default PhoneInput;
