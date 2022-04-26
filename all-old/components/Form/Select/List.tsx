import { CheckIcon } from "@heroicons/react/solid";
export const List: List = ({ children, className }) => {
  return <ul className={className}>{children}</ul>;
};

export const Option: Option = ({ children, className, handleChange, selected }) => {
  return (
    <li
      tabIndex={0}
      onClick={handleChange}
      className={className(selected)}
    >
      <span className="text-slate-700 text-sm font-medium">{children}</span>
      {selected && <CheckIcon className="fill-slate-800 ml-auto mr-2 h-5 w-5" />}
    </li>
  );
};

export type Option = React.FC<
  CP<{
    selected: boolean;
    handleChange(): void;
    className: (selected: boolean) => string;
  }>
>;
export type List = React.FC<CP<{ className: string }>>;
