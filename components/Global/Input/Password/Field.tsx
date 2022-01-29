import { FunctionComponent, useState } from "react";

import Input, { InputProps } from "components/Global/Input";

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

  function handleChange(val: string) {
    onChange(val);
    setValid(
      val === "" || typing
        ? undefined
        : validators?.every(({ regex }) => regex.test(val)) ?? true
    );
  }

  return (
    <Input
      {...props}
      type="password"
      setTyping={setTyping}
      onChange={handleChange}
      {...({ id, label } as { [key: string]: string })}
      className={typeof className === "string" ? className : className(valid)}
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
