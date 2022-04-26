import { useState } from "react";

import { useIsomorphicLayoutEffect } from "utils";
import Input, { InputProps } from "./components/Form/Input";

const Field: Field = ({ id, className, label, onChange, validators, ...props }) => {
  const [typing, setTyping] = useState(false);
  const [valid, setValid] = useState<boolean>();

  useIsomorphicLayoutEffect(
    () =>
      setValid(
        props.value === "" || typing
          ? undefined
          : validators?.every(({ regex }) => regex.test(props.value ?? "")) ?? true
      ),
    [props.value, typing, validators]
  );

  return (
    <Input
      {...props}
      type="password"
      onChange={onChange}
      setTyping={setTyping}
      {...({ id, label } as { [key: string]: string })}
      className={typeof className === "string" ? className : className(valid)}
    />
  );
};

export type FieldProps = Omit<InputProps, "type"> & {
  validators?: Array<{
    regex: RegExp;
    message: string;
  }>;
};

type Field = React.FC<FieldProps>;

export default Field;
