import { FunctionComponent, useState } from "react";

import Conditions from "./Conditions";
import Field, { FieldProps } from "./Field";

const Password: Password = ({
  confirmProps,
  hideConditions,
  validators,
  value,
  withConfirm,
  ...props
}) => {
  const [confirmValue, setConfirmValue] = useState("");

  return (
    <div className="flex flex-col gap-y-3">
      <Field {...{ validators, value, ...props }} />
      {!hideConditions && !!validators?.length && <Conditions {...{ validators, value }} />}
      {!!withConfirm && (
        <>
          <span className="-mt-1" />
          <Field
            value={confirmValue}
            required={props.required}
            onChange={setConfirmValue}
            className={props.className}
            id={confirmProps?.id ?? `confirm${props.id ?? ""}`}
            label={confirmProps?.label ?? `Confirm ${props.label ?? ""}`}
            validators={[
              {
                message: "",
                regex: new RegExp(`^${value ?? ""}$`),
              },
            ]}
          />
        </>
      )}
    </div>
  );
};

type Password = FunctionComponent<
  FieldProps & {
    hideConditions?: boolean;
    withConfirm?: boolean;
    confirmProps?: Pick<FieldProps, "id" | "label">;
  }
>;

export default Password;
