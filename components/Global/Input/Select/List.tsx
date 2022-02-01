import { CheckIcon } from "@heroicons/react/solid";
import { FunctionComponent } from "react";

export const List: List = ({ children, className }) => {
  return <ul className={className}>{children}</ul>;
};

export const Option: Option = ({
  children,
  className,
  handleChange,
  selected,
}) => {
  return (
    <li onClick={handleChange} className={className(selected)}>
      <span className="text-sm font-medium text-slate-700">{children}</span>
      {selected && (
        <CheckIcon className="ml-auto mr-2 h-5 w-5 fill-slate-800" />
      )}
    </li>
  );
};

export type Option = FunctionComponent<{
  selected: boolean;
  handleChange(): void;
  className: (selected: boolean) => string;
}>;
export type List = FunctionComponent<{ className: string }>;