import { FunctionComponent } from "react";

import Conditions from "./Conditions";
import Field, { FieldProps } from "./Field";

const PasswordInput: PasswordInput = ({ validators, value, ...props }) => {
  return (
    <div className="space-y-3">
      <Field {...{ validators, value, ...props }} />
      {validators !== undefined && validators.length > 0 && (
        <Conditions {...{ validators, value }} />
      )}
    </div>
  );
};

type PasswordInput = FunctionComponent<FieldProps>;

export default PasswordInput;
