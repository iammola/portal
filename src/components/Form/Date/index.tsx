import { FunctionComponent } from "react";

import Field from "./Field";

const Date: Date = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

Date.Field = Field;

Date.Label = ({ children, className }) => {
  return <span className={className}>{children}</span>;
};

interface Date extends FunctionComponent<{ className: string }> {
  Field: Field;
  Label: FunctionComponent<{ className: string }>;
}

export default Date;
