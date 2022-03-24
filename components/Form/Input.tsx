import { ComponentProps, FunctionComponent, useRef, useState } from "react";
import dynamic from "next/dynamic";

import { useIsChanging, useIsomorphicLayoutEffect } from "hooks";
import { classNames } from "utils";

const XIcon = dynamic(() => import("@heroicons/react/solid/XIcon"));
const CheckIcon = dynamic(() => import("@heroicons/react/solid/CheckIcon"));

const Input: Input = ({ className, hideOptionalLabel, label, showIcons, onChange, value, setTyping, ...props }) => {
  const [valid, setValid] = useState<boolean>();
  const ref = useRef<HTMLInputElement>(null);

  const typing = useIsChanging(value);

  useIsomorphicLayoutEffect(() => {
    const input = ref.current;
    setTyping?.(typing);
    if (!typing) setValid(input?.value === "" ? undefined : input?.validity.valid);
  }, [props, setTyping, typing]);

  return (
    <div className="relative grid w-full items-center gap-x-2">
      <input
        ref={ref}
        {...props}
        value={value ?? ""}
        type={props.type ?? "text"}
        placeholder={label || " "}
        onChange={(e) => onChange(e.target.value)}
        className={classNames(
          "peer row-start-1 p-2 pl-4",
          typeof className === "string" ? className : className(valid)
        )}
      />
      {label && (
        <label
          htmlFor={props.id}
          className="absolute left-[-0.4rem] -top-4 bg-white p-1 text-xs font-medium tracking-wide text-slate-600 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-4 peer-placeholder-shown:select-none peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:tracking-normal peer-focus:left-[-0.4rem] peer-focus:top-[-0.95rem] peer-focus:bg-white peer-focus:text-xs peer-focus:font-medium peer-focus:tracking-wide"
        >
          {label}
        </label>
      )}
      {![props.required, hideOptionalLabel].includes(true) && (
        <span className="absolute right-0.5 -top-5 text-xs text-slate-500">Optional</span>
      )}
      {showIcons && (
        <>
          <CheckIcon
            className={classNames("col-start-2 row-start-1 h-5 w-5 fill-emerald-500 peer-placeholder-shown:opacity-0", {
              "opacity-0": !valid,
            })}
          />
          <XIcon
            className={classNames("col-start-2 row-start-1 h-5 w-5 fill-red-500 peer-placeholder-shown:opacity-0", {
              "opacity-0": valid !== false,
            })}
          />
        </>
      )}
    </div>
  );
};

export type InputProps = Omit<ComponentProps<"input">, "id" | "className" | "onChange" | "ref" | "value"> & {
  value?: string;
  showIcons?: boolean;
  onChange(v: string): void;
  hideOptionalLabel?: boolean;
  setTyping?: (typing: boolean) => void;
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

type Input = FunctionComponent<InputProps>;

export default Input;
