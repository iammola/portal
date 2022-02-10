import { FunctionComponent, useMemo } from "react";

import { ModelNames } from "db";
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
    <li>
      <label htmlFor={unique} className="grid grid-cols-5 grid-rows-4">
        <input
          name={id}
          id={unique}
          type="radio"
          checked={selected}
          onChange={(e) => e.target.checked && onChange(id)}
        />
        <h4 className="col-start-1 col-end-5 row-start-1 row-end-2 text-sm font-bold uppercase tracking-wide">
          {label}
        </h4>
        <p className="col-start-1 col-end-6 row-start-2 row-end-5 text-sm text-slate-400">
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
