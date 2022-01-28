import {
  ComponentProps,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import dynamic from "next/dynamic";

import { useIsChanging } from "hooks";
import { classNames } from "utils";

import DateInput from "./Date";
import PhoneInput from "./Phone";
import NumberInput from "./Number";
import TextareaInput from "./Textarea";
import DynamicEmailInput from "./DynamicEmail";

const XIcon = dynamic(() => import("@heroicons/react/solid/XIcon"));
const CheckIcon = dynamic(() => import("@heroicons/react/solid/CheckIcon"));

const Input: Input = ({
  className,
  label,
  showIcons,
  onChange,
  value,
  ...props
}) => {
  const [valid, setValid] = useState<boolean>();
  const ref = useRef<HTMLInputElement>(null);

  const typing = useIsChanging(value);

  useEffect(() => {
    const input = ref.current;
    if (typing === false)
      setValid(input?.value === "" ? undefined : input?.validity.valid);
  }, [typing, props]);

  return (
    <div className="relative grid gap-x-2 items-center w-full">
      <input
        ref={ref}
        {...props}
        value={value ?? ""}
        placeholder={label || " "}
        onChange={(e) => onChange(e.target.value)}
        className={classNames(
          "peer p-2 pl-4 row-start-1",
          typeof className === "string" ? className : className(valid)
        )}
      />
      {label && (
        <label
          htmlFor={props.id}
          className="absolute left-[-0.4rem] -top-4 p-1 text-slate-600 transition-all text-xs font-medium bg-white tracking-wide peer-focus:text-xs peer-focus:left-[-0.4rem] peer-focus:top-[-0.95rem] peer-focus:bg-white peer-focus:font-medium peer-focus:tracking-wide peer-placeholder-shown:select-none peer-placeholder-shown:left-3 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:bg-transparent peer-placeholder-shown:tracking-normal"
        >
          {label}
        </label>
      )}
      {props.required !== true && (
        <span className="absolute right-0.5 -top-5 text-xs text-slate-500">
          Optional
        </span>
      )}
      {showIcons === true && (
        <>
          <CheckIcon
            className={classNames(
              "h-5 w-5 fill-emerald-500 peer-placeholder-shown:opacity-0 row-start-1 col-start-2",
              {
                "opacity-0": valid !== true,
              }
            )}
          />
          <XIcon
            className={classNames(
              "h-5 w-5 fill-red-500 peer-placeholder-shown:opacity-0 row-start-1 col-start-2",
              {
                "opacity-0": valid !== false,
              }
            )}
          />
        </>
      )}
    </div>
  );
};

Input.Date = DateInput;
Input.Phone = PhoneInput;
Input.Number = NumberInput;
Input.Textarea = TextareaInput;
Input.DynamicEmail = DynamicEmailInput;

export type InputProps = Omit<
  ComponentProps<"input">,
  "id" | "className" | "onChange" | "ref" | "value"
> & {
  value?: string;
  showIcons?: boolean;
  onChange(v: string): void;
  className: string | ((valid?: boolean) => string);
} & (
    | {
        id: string;
        label: string;
      }
    | {
        id?: string;
        label?: "";
      }
  );

interface Input extends FunctionComponent<InputProps> {
  Date: DateInput;
  Phone: PhoneInput;
  Number: NumberInput;
  Textarea: TextareaInput;
  DynamicEmail: DynamicEmailInput;
}

export default Input;
