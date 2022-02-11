import { FunctionComponent, useMemo } from "react";

import { ModelNames } from "db";
import { classNames } from "utils";
import { useIsomorphicLayoutEffect } from "hooks";

import type { SubjectRecord } from "types/schema";

const Options: Options = ({ className, id, onChange, value }) => {
  const options = useMemo<OptionValue[]>(
    () => [
      {
        id: ModelNames.B_SUBJECT,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, vitae!",
        label: "Base",
      },
      {
        id: ModelNames.G_SUBJECT,
        label: "Grouped",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, nulla.",
      },
    ],
    []
  );

  useIsomorphicLayoutEffect(() => {
    if (value === undefined) onChange(options[0].id);
  }, [onChange, options, value]);

  return (
    <ul className={className}>
      {options.map((option) => (
        <Option
          uniqueId={id}
          key={option.id}
          {...{ onChange, ...option }}
          selected={option.id === value}
        />
      ))}
    </ul>
  );
};

const Option: Option = ({
  description,
  id,
  label,
  onChange,
  selected,
  uniqueId,
}) => {
  const unique = useMemo(
    () => uniqueId + Math.random().toString(36).slice(2),
    [uniqueId]
  );

  return (
    <li
      className={classNames("w-1/2 rounded-lg ring-2 hover:shadow-md", [
        selected,
        "bg-blue-50 ring-blue-500",
        "bg-white ring-slate-300",
      ])}
    >
      <label
        htmlFor={unique}
        className="grid cursor-pointer grid-cols-5 gap-y-1 py-5 px-7"
      >
        <input
          name={id}
          id={unique}
          type="radio"
          checked={selected}
          onChange={(e) => e.target.checked && onChange(id)}
          className="col-start-5 col-end-6 row-start-1 h-3.5 w-3.5 justify-self-end"
        />
        <h4 className="col-start-1 col-end-5 row-start-1 text-lg font-medium text-slate-700">
          {label}
        </h4>
        <p className="col-start-1 col-end-6 text-[0.85rem] text-slate-500">
          {description}
        </p>
      </label>
    </li>
  );
};

export type OptionValue = {
  label: string;
  description: string;
  id: SubjectRecord["__type"];
};

type Option = FunctionComponent<
  OptionValue &
    Pick<OptionsProps, "onChange"> & { selected: boolean; uniqueId: string }
>;

type OptionsProps = {
  id: string;
  className: string;
  value?: OptionValue["id"];
  onChange(v: OptionValue["id"]): void;
};

type Options = FunctionComponent<OptionsProps>;

export default Options;
