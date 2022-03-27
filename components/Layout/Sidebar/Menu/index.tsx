import { parse } from "cookie";
import { Fragment, FunctionComponent, useState } from "react";

import { USER_COOKIE } from "utils";
import { useIsomorphicLayoutEffect } from "hooks";

import { Item, List } from "./Items";
import navigation from "./navigation.json";

export const Menu: FunctionComponent = () => {
  const [items, setItems] = useState<Navigation[]>([]);

  useIsomorphicLayoutEffect(() => {
    const user = parse(document.cookie)[USER_COOKIE] as "student" | "teacher" | "parent";
    setItems(navigation[user] as unknown as Navigation[]);
  }, []);

  return (
    <div className="w-full grow space-y-2 p-4">
      {items.map(({ href, items, title }) => (
        <Fragment key={title}>
          {href !== undefined && <Item href={href}>{title}</Item>}
          {items !== undefined && <List items={items}>{title}</List>}
        </Fragment>
      ))}
    </div>
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
