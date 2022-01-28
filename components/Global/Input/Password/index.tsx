import { FunctionComponent, useState } from "react";

import Input, { InputProps } from "components/Global/Input";

const Password: Password = ({ id, className, label, ...props }) => {
  const [valid] = useState<boolean>();

  return (
    <Input
      {...props}
      type="password"
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
