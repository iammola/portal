import { FunctionComponent } from "react";

import Field, { FieldProps } from "./Field";

const PasswordInput: PasswordInput = (props) => {
  return (
    <div className="">
      <Field {...props} />
    </div>
  );
};

type PasswordInput = FunctionComponent<FieldProps>;

export default PasswordInput;
