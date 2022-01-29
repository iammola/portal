import { FunctionComponent } from "react";

import { FieldProps } from "./Field";

const Conditions: Conditions = ({ validators }) => {
  return (
    <ul className="w-full space-y-1">
      {validators.map(({ message }) => (
        <li
          key={message}
          className="flex flex-row items-center justify-start gap-x-2 text-xs text-slate-700"
        >
          {message}
        </li>
      ))}
    </ul>
  );
};

type Conditions = FunctionComponent<
  Pick<FieldProps, "value"> & {
    validators: NonNullable<FieldProps["validators"]>;
  }
>;

export default Conditions;
