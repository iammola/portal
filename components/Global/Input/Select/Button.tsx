import { FunctionComponent } from "react";
import { ChevronUpIcon } from "@heroicons/react/solid";

import { classNames } from "utils";

const Button: Button = ({ children, open, setOpen, valueSelected }) => {
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="group relative grid w-full cursor-pointer grid-cols-[1fr_max-content] items-center justify-start gap-x-8 rounded-lg border border-slate-300 p-4 ring-2 ring-transparent focus:border-transparent focus:outline-none focus:ring-blue-400"
    >
      <span
        className={classNames(
          "absolute col-start-1 select-none p-1 text-slate-600 transition-all",
          [
            !valueSelected && open,
            "left-[-0.4rem] -top-3 bg-white text-xs font-medium tracking-normal",
            "left-0 top-1/2 -translate-y-1/2 bg-transparent text-sm tracking-wide group-focus:left-[-0.4rem] group-focus:-top-3 group-focus:-translate-y-0 group-focus:bg-white group-focus:text-xs group-focus:font-medium group-focus:tracking-wide",
          ]
        )}
      >
        {children}
      </span>
      <ChevronUpIcon
        className={classNames("col-start-2 h-5 w-5 fill-slate-600", {
          "rotate-180": open === false,
        })}
      />
    </button>
  );
};

type Button = FunctionComponent<{
  open: boolean;
  valueSelected: boolean;
  setOpen(open: boolean): void;
}>;

export default Button;
