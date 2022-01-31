import { FunctionComponent } from "react";

export const List: List = ({ children, className }) => {
  return <ul className={className}>{children}</ul>;
};

export const Option: Option = ({ children, className, selected }) => {
  return (
    <li className={className(selected)}>
      <span className="text-sm font-medium text-slate-700">{children}</span>
    </li>
  );
};

export type Option = FunctionComponent<{
  selected: boolean;
  className: (selected: boolean) => string;
}>;
export type List = FunctionComponent<{ className: string }>;
