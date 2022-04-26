import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

import { classNames } from "utils";

export const List: React.FC<CP<Props>> = ({ children, className, pagination }) => {
  function changePage(direction: "prev" | "next") {
    if (!pagination) return;
    const { page = 1, pages = 1 } = pagination;
    if (direction === "prev" && page > 1) pagination.changePage(page - 1);
    if (direction === "next" && page < pages) pagination.changePage(page + 1);
  }

  return (
    <div className={className}>
      {children}
      <div className="flex w-full items-center justify-between text-xs">
        {(pagination?.pages ?? 1) > 1 && (
          <button
            type="button"
            onClick={() => changePage("prev")}
            className="text-slate-600 flex cursor-pointer items-center gap-x-3 py-4"
          >
            <ChevronLeftIcon className="fill-slate-500 h-5 w-5" />
            Previous
          </button>
        )}
        <div className="flex grow items-center justify-center gap-x-6">
          {new Array(pagination?.pages ?? 1).fill(null).map((_, idx) => (
            <span
              key={idx}
              className={classNames("relative cursor-pointer py-4 px-2 font-light", [
                idx !== pagination?.page,
                "text-slate-600",
                "text-blue-600 after:bg-blue-600 after:absolute after:-top-1 after:left-0 after:h-0.5 after:w-full",
              ])}
            >
              {idx + 1}
            </span>
          ))}
        </div>
        {(pagination?.pages ?? 1) > 1 && (
          <button
            type="button"
            onClick={() => changePage("next")}
            className="text-slate-600 flex cursor-pointer items-center gap-x-3 py-4"
          >
            Next
            <ChevronRightIcon className="fill-slate-500 h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

interface Props {
  className: string;
  pagination?: {
    page?: number;
    pages?: number;
    changePage(page: number): void;
  };
}
