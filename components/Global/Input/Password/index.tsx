import { FunctionComponent } from "react";

import Input, { InputProps } from "components/Global/Input";

const Password: Password = ({ id, label, ...props }) => {
  return (
    <Input
      {...props}
      type="password"
      {...({ id, label } as { [key: string]: string })}
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
