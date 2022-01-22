import { FunctionComponent, useEffect, useState } from "react";

import { useIsChanging } from "hooks";

const Field: Field = ({ className, max, onChange, required, value }) => {
    const typing = useIsChanging(value);
    const [valid, setValid] = useState<boolean>();

    useEffect(() => {
        if (typing === false)
            setValid(required === true ? value.length > 0 : value.length < 1 ? undefined : true);
    }, [required, typing, value]);

    return (
        <div className="relative w-[inherit] h-[inherit]">
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={typeof className === "string" ? className : className(valid)}
            />
            {required !== true && (
                <span className="absolute right-0.5 -top-5 text-xs text-slate-500">Optional</span>
            )}
            {max !== undefined && (
                <span className="pl-0.5 text-xs text-slate-500">
                    {value.length} / {max}
                </span>
            )}
        </div>
    );
};

type Field = FunctionComponent<{
    max?: number;
    value: string;
    required?: boolean;
    onChange(values: string): void;
    className: string | ((valid?: boolean) => string);
}>;

export default Field;
