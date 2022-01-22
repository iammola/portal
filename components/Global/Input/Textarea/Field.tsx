import { FunctionComponent, useEffect, useState } from "react";

import { useIsChanging } from "hooks";

const Field: Field = ({ className, onChange, required, value }) => {
    const typing = useIsChanging(value);
    const [valid, setValid] = useState<boolean>();

    useEffect(() => {
        if (typing === false)
            setValid(required === true ? value.length > 0 : value.length < 1 ? undefined : true);
    }, [required, typing, value]);

    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={typeof className === "string" ? className : className(valid)}
        />
    );
};

type Field = FunctionComponent<{
    value: string;
    required?: boolean;
    onChange(values: string): void;
    className: string | ((valid?: boolean) => string);
}>;

export default Field;
