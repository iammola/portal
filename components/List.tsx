import { FunctionComponent } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

import { classNames } from "utils";

export const List: FunctionComponent<Props> = ({ children, className, pagination }) => {
  function changePage(direction: "prev" | "next") {
    const { active, pages } = pagination;
    if (direction === "prev" && active > 1) pagination.changePage(active - 1);
    if (direction === "next" && active < pages) pagination.changePage(active + 1);
  }

  return (
    <div className={className}>
      {children}
      <div className="flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={() => changePage("prev")}
          className="flex cursor-pointer items-center gap-x-3 py-4 text-slate-600"
        >
          <ChevronLeftIcon className="h-5 w-5 fill-slate-500" />
          Previous
        </button>
        <div className="flex items-center justify-center gap-x-6">
          {new Array(pagination.pages).fill(null).map((_, idx) => (
            <span
              key={idx}
              className={classNames("relative cursor-pointer py-4 px-2 font-light", [
                idx + 1 !== pagination.active,
                "text-slate-600",
                "text-blue-600 after:absolute after:-top-1 after:left-0 after:h-0.5 after:w-full after:bg-blue-600",
              ])}
            >
              {idx + 1}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={() => changePage("next")}
          className="flex cursor-pointer items-center gap-x-3 py-4 text-slate-600"
        >
          Next
          <ChevronRightIcon className="h-5 w-5 fill-slate-500" />
        </button>
      </div>
    </div>
  );
};

interface Props {
  className: string;
  pagination: {
    active: number;
    pages: number;
    changePage(page: number): void;
  };
}
