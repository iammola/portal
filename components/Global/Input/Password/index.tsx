import { FunctionComponent } from "react";

import Conditions from "./Conditions";
import Field, { FieldProps } from "./Field";

const PasswordInput: PasswordInput = ({
  hideConditions,
  validators,
  value,
  ...props
}) => {
  return (
    <div className="space-y-3">
      <Field {...{ validators, value, ...props }} />
      {hideConditions !== true && !!validators?.length && (
        <Conditions {...{ validators, value }} />
      )}
    </div>
  );
};

type PasswordInput = FunctionComponent<
  FieldProps & { hideConditions?: boolean }
>;

export default PasswordInput;
