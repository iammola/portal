import { FunctionComponent } from "react";
import Link, { LinkProps } from "next/link";
import { ChevronRightIcon } from "@heroicons/react/solid";

import { classNames } from "utils";

export const Item: FunctionComponent<ItemProps> = ({ children, className, href }) => {
  return (
    <Link href={href}>
      <a
        className={classNames(
          "flex h-11 w-full cursor-pointer items-center justify-start gap-x-4 rounded-lg px-4 hover:bg-slate-100",
          className
        )}
      >
        <span className="relative flex h-5 w-5 shrink-0 items-center justify-center after:h-1.5 after:w-1.5 after:rounded-full after:bg-white after:ring-2 after:ring-gray-700" />
        <div className="grow truncate text-sm font-light tracking-wide text-gray-700">{children}</div>
      </a>
    </Link>
  );
};

export const List: FunctionComponent<ListProps> = ({ children, items }) => {
  return (
    <details className="group">
      <summary className="flex h-11 w-full cursor-pointer items-center justify-start gap-x-4 rounded-lg px-4 hover:bg-slate-100 group-open:mb-1 group-open:bg-slate-50">
        <ChevronRightIcon className="h-5 w-5 shrink-0 fill-gray-700 group-open:rotate-90" />
        <div className="grow truncate text-sm font-light tracking-wide text-gray-700">{children}</div>
      </summary>
      {items.map((item) => (
        <Item
          key={item.title}
          href={item.href}
          className="pl-8"
        >
          {item.title}
        </Item>
      ))}
    </details>
  );
};

interface ItemProps {
  className?: string;
  href: LinkProps["href"];
}

interface ListProps {
  items: Array<ItemProps & Record<"title", string>>;
}
