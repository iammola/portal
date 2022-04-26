import { useState } from "react";

import { classNames, useIsChanging, useIsomorphicLayoutEffect } from "utils";

const Field: Field = ({ className, id, max, onChange, parentClassName, required, value }) => {
  const typing = useIsChanging(value);
  const [valid, setValid] = useState<boolean>();
  const [limitPassed, setLimitPassed] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (!typing) {
      const length = value?.length ?? 0;
      setValid(required ? length > 0 : length < 1 ? undefined : true);
    }
  }, [required, typing, value]);

  useIsomorphicLayoutEffect(() => {
    setLimitPassed(max !== undefined && (value?.length ?? 0) > max);
  }, [max, value]);

  return (
    <div className={classNames("relative", parentClassName)}>
      <textarea
        id={id}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={typeof className === "string" ? className : className(!limitPassed && valid)}
      />
      {!required && <span className="text-slate-500 absolute right-0.5 -top-5 text-xs">Optional</span>}
      {max !== undefined && (
        <span className={classNames("pl-0.5 text-xs", [limitPassed, "text-red-500", "text-slate-500"])}>
          {value?.length ?? 0} / {max}
        </span>
      )}
    </div>
  );
};

type Field = React.FC<{
  id?: string;
  max?: number;
  value?: string;
  required?: boolean;
  parentClassName?: string;
  onChange(values: string): void;
  className: string | ((valid?: boolean) => string);
}>;

export default Field;
