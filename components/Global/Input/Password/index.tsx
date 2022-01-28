import { FunctionComponent, useState } from "react";

import Input, { InputProps } from "components/Global/Input";

const Password: Password = ({
  id,
  className,
  label,
  onChange,
  validators,
  ...props
}) => {
  const [valid, setValid] = useState<boolean>();

  function handleChange(val: string) {
    onChange(val);
    setValid(
      val === ""
        ? undefined
        : validators?.every(({ regex }) => regex.test(val)) ?? true
    );
  }

  return (
    <Input
      {...props}
      type="password"
      onChange={handleChange}
      {...({ id, label } as { [key: string]: string })}
      className={typeof className === "string" ? className : className(valid)}
    />
  );
};

type Password = FunctionComponent<
  Omit<InputProps, "type"> & {
    validators?: {
      regex: RegExp;
      message: string;
    }[];
  }
>;

export default Password;
