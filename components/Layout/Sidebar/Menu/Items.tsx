import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";
import Link, { LinkProps } from "next/link";
import { FunctionComponent, useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/solid";

import { classNames } from "utils";
import { useIsomorphicLayoutEffect } from "hooks";

export const Item: FunctionComponent<ItemProps> = ({ children, className, href }) => {
  return (
    <Tab
      className={({ selected }) =>
        classNames("h-11 w-full cursor-pointer rounded-lg hover:bg-slate-50", { "bg-slate-50": selected }, className)
      }
    >
      <Link href={href}>
        <a className="flex h-full items-center justify-start gap-x-4 px-4">
          <span className="relative flex h-5 w-5 shrink-0 items-center justify-center after:h-1.5 after:w-1.5 after:rounded-full after:bg-white after:ring-2 after:ring-gray-700" />
          <div className="grow truncate text-left text-sm font-light tracking-wide text-gray-700">{children}</div>
        </a>
      </Link>
    </Tab>
  );
};

export const List: FunctionComponent<ListProps> = ({ children, items }) => {
  const router = useRouter();
  const [active, setActive] = useState(-1);

  useIsomorphicLayoutEffect(() => {
    if (!router.isReady) return;

    setActive(items.findIndex((i) => i.href === router.pathname));
  }, [items, router]);

  return (
    <Tab.List
      as="details"
      className="group"
    >
      <Tab
        as="summary"
        className={({ selected }) =>
          classNames(
            "flex h-11 w-full cursor-pointer items-center justify-start gap-x-4 rounded-lg px-4 hover:bg-slate-50 group-open:mb-1 group-open:bg-slate-50",
            { "bg-slate-50": selected }
          )
        }
      >
        <ChevronRightIcon className="h-5 w-5 shrink-0 fill-gray-700 group-open:rotate-90" />
        <div className="grow truncate text-sm font-light tracking-wide text-gray-700">{children}</div>
      </Tab>
      {items.map((item, itemIdx) => (
        <Item
          key={item.title}
          href={item.href}
          className={classNames("pl-8", { "bg-slate-50": itemIdx === active })}
        >
          {item.title}
        </Item>
      ))}
    </Tab.List>
  );
};

interface ItemProps {
  className?: string;
  href: LinkProps["href"];
}

interface ListProps {
  items: Array<{
    title: string;
    href: LinkProps["href"];
  }>;
}
