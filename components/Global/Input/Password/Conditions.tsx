import { FunctionComponent } from "react";

import { FieldProps } from "./Field";

const Conditions: Conditions = () => {
  return <div className="w-full space-y-1"></div>;
};

type Conditions = FunctionComponent<
  Pick<FieldProps, "value"> & {
    validators: NonNullable<FieldProps["validators"]>;
  }
>;

export default Conditions;
