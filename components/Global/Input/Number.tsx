import { FormEvent, FunctionComponent } from "react";

import Input, { InputProps } from "components/Global/Input";

const NumberInput: NumberInput = (props) => {
    const validateCharacter = (e: FormEvent<HTMLInputElement> & { data: string }) =>
        /\d/.test(e.data) === false && e.preventDefault();

    return <Input {...props} pattern="\d+" inputMode="numeric" onBeforeInput={validateCharacter} />;
};

type NumberInput = FunctionComponent<
    Omit<InputProps, "pattern" | "inputMode" | "onBeforeInput" | "value" | "onChange"> & {
        value?: number;
        onChange(value: number): void;
    }
>;

export default NumberInput;
