import { FunctionComponent } from "react";

import Input, { InputProps } from "components/Global/Input";

const NumberInput: NumberInput = (props) => {
    return <Input {...props} />;
};

type NumberInput = FunctionComponent<Omit<InputProps, "pattern" | "inputMode" | "onBeforeInput">>;

export default NumberInput;
