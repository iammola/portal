import { CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from "@heroicons/react/solid";

import { FieldProps } from "./Field";

const Conditions: Conditions = ({ validators, value }) => {
  return (
    <ul className="w-full space-y-1">
      {validators.map(({ message, regex }) => (
        <li
          key={message}
          className="text-slate-700 flex flex-row items-center justify-start gap-x-2 text-xs"
        >
          {!value ? (
            <ExclamationCircleIcon className="fill-slate-400 h-5 w-5 shrink-0" />
          ) : regex.test(value) ? (
            <CheckCircleIcon className="fill-emerald-500 h-5 w-5 shrink-0" />
          ) : (
            <XCircleIcon className="fill-rose-500 h-5 w-5 shrink-0" />
          )}
          {message}
        </li>
      ))}
    </ul>
  );
};

type Conditions = React.FC<
  Pick<FieldProps, "value"> & {
    validators: NonNullable<FieldProps["validators"]>;
  }
>;

export default Conditions;
