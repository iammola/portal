import { FunctionComponent, useState } from "react";

import Input, { InputProps } from "components/Form/Input";
import { useIsomorphicLayoutEffect } from "hooks";

const Field: Field = ({
  id,
  className,
  label,
  onChange,
  validators,
  ...props
}) => {
  const [typing, setTyping] = useState(false);
  const [valid, setValid] = useState<boolean>();

  useIsomorphicLayoutEffect(
    () =>
      setValid(
        props.value === "" || typing
          ? undefined
          : validators?.every(({ regex }) => regex.test(props.value ?? "")) ??
              true
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
      className={typeof className === "string" ? className : className?.(valid)}
    />
  );
};

export type FieldProps = Omit<InputProps, "type"> & {
  validators?: {
    regex: RegExp;
    message: string;
  }[];
};

type Field = FunctionComponent<FieldProps>;

export default Field;
