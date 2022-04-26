import { SelectorIcon } from "@heroicons/react/solid";

import { classNames } from "utils";

const Button: Button = ({ children, label, open, setOpen, valueSelected }) => {
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    setOpen(!open);
    open && (e.target as HTMLDivElement).blur();
  }

  return (
    <div
      tabIndex={0}
      onClick={handleClick}
      style={{ gridTemplateColumns: "minmax(0, 1fr) max-content" }}
      className="border-slate-300 focus:ring-blue-400 group relative grid h-[3.75rem] w-full cursor-pointer items-center justify-start gap-x-8 rounded-lg border p-4 ring-2 ring-transparent focus:border-transparent focus:outline-none"
    >
      {valueSelected && (
        <span className="text-slate-600 absolute left-[-0.4rem] -top-3 col-start-1 min-w-0 select-none bg-white p-1 text-xs font-medium tracking-normal">
          {label}
        </span>
      )}
      <span
        className={classNames(
          "text-slate-600 absolute col-start-1 min-w-0 select-none p-1 transition-all",
          {
            "group-focus:left-[-0.4rem] group-focus:-top-3 group-focus:-translate-y-0 group-focus:bg-white group-focus:text-xs group-focus:font-medium group-focus:tracking-wide":
              !valueSelected,
          },
          [
            !valueSelected && open,
            "left-[-0.4rem] -top-3 bg-white text-xs font-medium tracking-normal",
            "left-0 top-1/2 -translate-y-1/2 bg-transparent text-sm tracking-wide",
          ]
        )}
      >
        {children}
      </span>
      <SelectorIcon className="fill-slate-600 col-start-2 h-5 w-5" />
    </div>
  );
};

type Button = React.FC<
  CP<{
    open: boolean;
    label: string;
    valueSelected: boolean;
    setOpen(open: boolean): void;
  }>
>;

export default Button;
