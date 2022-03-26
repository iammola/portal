import Link from "next/link";
import { FunctionComponent } from "react";
import { ChevronRightIcon } from "@heroicons/react/solid";

export const Menu: FunctionComponent = () => {
  return (
    <div className="space-y-2 p-4">
      <Link href="">
        <a className="flex h-11 w-full cursor-pointer items-center justify-start gap-x-4 rounded-lg px-4 hover:bg-slate-100">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center after:h-1.5 after:w-1.5 after:rounded-full after:ring-2 after:ring-gray-700" />
          <div className="grow truncate text-sm font-light tracking-wide text-gray-700">Attendance Report</div>
        </a>
      </Link>
      <details className="group">
        <summary className="flex h-11 w-full cursor-pointer items-center justify-start gap-x-4 rounded-lg px-4 hover:bg-slate-100">
          <ChevronRightIcon className="h-5 w-5 shrink-0 fill-gray-700 group-open:rotate-90" />
          <div className="grow truncate text-sm font-light tracking-wide text-gray-700">People</div>
        </summary>
        <Link href="">
          <a className="flex h-11 w-full cursor-pointer items-center justify-start gap-x-4 rounded-lg pl-8 pr-4 hover:bg-slate-100">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center after:h-1.5 after:w-1.5 after:rounded-full after:ring-2 after:ring-gray-700" />
            <div className="grow truncate text-sm font-light tracking-wide text-gray-700">Students</div>
          </a>
        </Link>
        <Link href="">
          <a className="flex h-11 w-full cursor-pointer items-center justify-start gap-x-4 rounded-lg pl-8 pr-4 hover:bg-slate-100">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center after:h-1.5 after:w-1.5 after:rounded-full after:ring-2 after:ring-gray-700" />
            <div className="grow truncate text-sm font-light tracking-wide text-gray-700">Teachers</div>
          </a>
        </Link>
        <Link href="">
          <a className="flex h-11 w-full cursor-pointer items-center justify-start gap-x-4 rounded-lg pl-8 pr-4 hover:bg-slate-100">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center after:h-1.5 after:w-1.5 after:rounded-full after:ring-2 after:ring-gray-700" />
            <div className="grow truncate text-sm font-light tracking-wide text-gray-700">Parents</div>
          </a>
        </Link>
      </details>
    </div>
  );
};
