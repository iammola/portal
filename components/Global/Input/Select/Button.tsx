import { FunctionComponent } from "react";
import { ChevronUpIcon } from "@heroicons/react/solid";

import { classNames } from "utils";

const Button: Button = ({ children, open, setOpen }) => {
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="group relative grid w-full cursor-pointer grid-cols-[1fr_max-content] items-center justify-start gap-x-8 overflow-hidden rounded-lg border border-slate-300 p-4 ring-2 ring-transparent focus:border-transparent focus:outline-none focus:ring-blue-400"
    >
      <span className="absolute left-[-0.4rem] -top-4 col-start-1 bg-white p-1 text-xs font-medium tracking-wide text-slate-600 transition-all group-focus:left-[-0.4rem] group-focus:top-[-0.95rem] group-focus:bg-white group-focus:text-xs group-focus:tracking-wide group-focus-visible:font-medium">
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
  setOpen(open: boolean): void;
}>;

export default Button;
