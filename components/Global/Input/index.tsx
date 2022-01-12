import { ComponentProps, FunctionComponent, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

import { useIsChanging } from "hooks";
import { classNames } from "utils";

const XIcon = dynamic(() => import("@heroicons/react/solid/XIcon"));
const CheckIcon = dynamic(() => import("@heroicons/react/solid/CheckIcon"));

const Input: Input = ({ className, label, showIcons, onChange, ...props }) => {
    const [value, setValue] = useState(props.value ?? "");
    const [valid, setValid] = useState<boolean>();
    const ref = useRef<HTMLInputElement>(null);

    const typing = useIsChanging(value);

    useEffect(() => {
        const input = ref.current;
        if (typing === false) setValid(input?.value === "" ? undefined : input?.validity.valid);
    }, [typing]);

    useEffect(() => {
        onChange(value);
    }, [onChange, value]);

    return (
        <div className="relative grid gap-x-2 items-center">
            <input
                ref={ref}
                {...props}
                value={value}
                placeholder={label}
                onChange={(e) => setValue(e.target.value)}
                className={classNames(
                    "peer p-2 pl-4 row-start-1",
                    typeof className === "string" ? className : className(valid)
                )}
            />
            <label
                htmlFor={props.id}
                className="absolute left-[-.4rem] p-1 text-gray-800 transition-all text-sm -top-3.5 font-medium bg-white tracking-wide peer-focus:text-sm peer-focus:left-[-.4rem] peer-focus:top-[-.95rem] peer-focus:bg-white peer-focus:font-medium peer-focus:tracking-wide peer-placeholder-shown:select-none peer-placeholder-shown:left-3 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:bg-transparent peer-placeholder-shown:tracking-normal"
            >
                {label}
                {props.required === true && (
                    <span className="text-sm text-red-500 pl-0.5 align-middle">*</span>
                )}
            </label>
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

type Input = FunctionComponent<{
    onChange(v: NonNullable<ComponentProps<"input">["value"]>): void;
    className: string | ((valid?: boolean) => string);
    value?: ComponentProps<"input">["value"];
    type: ComponentProps<"input">["type"];
    showIcons?: boolean;
    required?: boolean;
    label: string;
    id: string;
}>;

export default Input;
