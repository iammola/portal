import { FunctionComponent } from "react";

import { InputProps } from "components/Global/Input";

const Password: Password = () => {
  return <></>;
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
