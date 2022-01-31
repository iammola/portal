import { FunctionComponent, useState } from "react";

import Button from "./Button";
import { Option, List } from "./List";

const Select: Select = ({ label }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button {...{ open, setOpen }}>{label}</Button>
    </div>
  );
};

interface Select extends FunctionComponent<{ label: string }> {
  List: List;
  Button: Button;
  Option: Option;
}

Select.List = List;
Select.Button = Button;
Select.Option = Option;

export default Select;
