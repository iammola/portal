import { parse } from "cookie";
import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, useCallback, useState } from "react";

import { useIsomorphicLayoutEffect, USER_COOKIE } from "utils";

import { Item, List } from "./Items";
import navigation from "./navigation.json";

export const Menu: React.FC = () => {
  const router = useRouter();
  const [items, setItems] = useState<Navigation[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const onChange = useCallback(() => {
    if (!router.isReady || items.length === 0) return;

    const paths = ["/", ...items.map((i) => i.href ?? (i.items ?? []).map((i) => i.href))];
    const idx = paths.findIndex((p) => p === router.pathname || p.indexOf(router.pathname) > -1);

    setSelectedIndex(~idx ? idx : 0);
  }, [items, router]);

  useIsomorphicLayoutEffect(() => {
    const user = parse(document.cookie)[USER_COOKIE] as "student" | "teacher" | "parent";
    setItems(navigation[user] as unknown as Navigation[]);
  }, []);

  useIsomorphicLayoutEffect(onChange, [items, onChange, router]);

  return (
    <Tab.Group
      manual
      vertical
      {...{ onChange, selectedIndex }}
    >
      <Tab.List className="w-full grow space-y-2 p-4">
        <Item href="/">Home</Item>
        {items.map(({ href, items, title }) => (
          <Fragment key={title}>
            {href !== undefined && <Item href={href}>{title}</Item>}
            {items !== undefined && <List items={items}>{title}</List>}
          </Fragment>
        ))}
      </Tab.List>
    </Tab.Group>
  );
};

interface NavigationItem {
  href: string;
  title: string;
}

interface NavigationList {
  title: string;
  items: NavigationItem[];
}

type Navigation = (NavigationList & Partial<NavigationItem>) | (NavigationItem & Partial<NavigationList>);
