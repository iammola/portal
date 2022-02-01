import { FunctionComponent, useState } from "react";

import { classNames } from "utils";
import { useIsomorphicLayoutEffect } from "hooks";

import Button from "./Button";
import { Option, List } from "./List";

const Select: Select = ({ label, onChange, options, value }) => {
  const [open, setOpen] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (open)
      (document.activeElement as HTMLElement)?.addEventListener(
        "blur",
        (e) =>
          !(e.target as HTMLElement)?.parentElement?.contains(
            e.relatedTarget as Node
          ) && setOpen(false),
        { once: true }
      );
  }, [open]);

  function handleChange(option: Value) {
    setOpen(false);
    onChange(option);
  }

  return (
    <div className="relative">
      <Button {...{ label, open, setOpen }} valueSelected={value != undefined}>
        {value?.value ?? label}
      </Button>
      <List
        className={classNames(
          "absolute top-full left-0 z-[1000] mt-2 max-h-[13.5rem] w-full space-y-1 overflow-hidden overflow-y-auto overflow-x-hidden rounded-xl border border-slate-200 bg-white py-2 px-2 shadow-lg",
          { "pointer-events-none invisible opacity-0": !open }
        )}
      >
        {options.map((option) => (
          <Option
            key={String(option.id)}
            selected={value === option}
            handleChange={() => handleChange(option)}
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
