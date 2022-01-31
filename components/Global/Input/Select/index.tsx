import { FunctionComponent, useState } from "react";

import { classNames } from "utils";

import Button from "./Button";
import { Option, List } from "./List";

const Select: Select = ({ label, options, value }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button {...{ open, setOpen }} valueSelected={value != undefined}>
        {label}
      </Button>
      <List
        className={classNames(
          "absolute top-full left-0 z-[1000] mt-2 max-h-[13.5rem] w-full space-y-1 overflow-hidden overflow-y-auto overflow-x-hidden rounded-xl border border-slate-200 bg-white py-2 px-2 shadow-lg",
          { "pointer-events-none invisible opacity-0": open === false }
        )}
      >
        {options.map((option) => (
          <Option
            key={String(option.id)}
            selected={value === option}
            className={(selected) =>
              classNames(
                "flex cursor-pointer flex-row items-center justify-start gap-x-4 rounded-xl p-2 hover:bg-slate-100 focus:outline-none",
                {
                  "focus:bg-slate-50": selected,
                }
              )
            }
          >
            {option.value}
          </Option>
        ))}
      </List>
    </div>
  );
};

interface Value {
  id: unknown;
  value: string;
}

interface SelectProps {
  value?: Value;
  label: string;
  options: Value[];
  onChange(value: Value): void;
}

interface Select extends FunctionComponent<SelectProps> {
  List: List;
  Button: Button;
  Option: Option;
}

Select.List = List;
Select.Button = Button;
Select.Option = Option;

export default Select;
