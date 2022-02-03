import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { FunctionComponent } from "react";

import { FieldProps } from "./Field";

const Conditions: Conditions = ({ validators, value }) => {
  return (
    <ul className="w-full space-y-1">
      {validators.map(({ message, regex }) => (
        <li
          key={message}
          className="flex flex-row items-center justify-start gap-x-2 text-xs text-slate-700"
        >
          {!value ? (
            <ExclamationCircleIcon className="h-5 w-5 shrink-0 fill-slate-400" />
          ) : regex.test(value) ? (
            <CheckCircleIcon className="h-5 w-5 shrink-0 fill-emerald-500" />
          ) : (
            <XCircleIcon className="h-5 w-5 shrink-0 fill-rose-500" />
          )}
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
