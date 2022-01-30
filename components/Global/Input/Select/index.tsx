import { FunctionComponent, useState } from "react";

import Button from "./Button";

const Select: Select = ({ label }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button {...{ open, setOpen }}>{label}</Button>
    </div>
  );
};

interface Select extends FunctionComponent<{ label: string }> {
  Button: Button;
}

Select.Button = Button;

export default Select;
