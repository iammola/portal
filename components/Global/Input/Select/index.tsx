import { FunctionComponent } from "react";

import Button from "./Button";

const Select: Select = ({ children }) => {
  return <div>{children}</div>;
};

interface Select extends FunctionComponent {
  Button: Button;
}

Select.Button = Button;

export default Select;
