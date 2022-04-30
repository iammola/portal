import Link from "next/link";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { Fragment, useMemo } from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";

import { USER_COOKIE } from "utils";

import navigation from "./navigation.json";

export const Menu: React.FC = () => {
  const list = useMemo<Array<MenuLink | MenuList>>(() => {
    const level = getCookie(USER_COOKIE);
    if (!level) return [];

    return navigation[level as keyof typeof navigation];
  }, []);

  return (
    <NavigationMenuPrimitive.Root orientation="vertical">
      <NavigationMenuPrimitive.List className="w-full grow space-y-2 p-4">
        {list.map((item, idx) => (
          <NavigationMenuPrimitive.Item key={`${idx} - ${item.title}`}>
            {item.kind === "link" && <NavigationLink {...item} />}
            {item.kind === "list" && (
              <Fragment>
                <NavigationMenuPrimitive.Trigger>{item.title}</NavigationMenuPrimitive.Trigger>
                <NavigationMenuPrimitive.Content>
                  {item.list.map((item) => (
                    <NavigationLink
                      {...item}
                      key={item.title}
                    />
                  ))}
                </NavigationMenuPrimitive.Content>
              </Fragment>
            )}
          </NavigationMenuPrimitive.Item>
        ))}
      </NavigationMenuPrimitive.List>
      <NavigationMenuPrimitive.Viewport />
    </NavigationMenuPrimitive.Root>
  );
};

const NavigationLink: React.FC<MenuLink> = ({ title, href }) => {
  const { asPath } = useRouter();
  const isActive = asPath === href;

  return (
    <NavigationMenuPrimitive.Link asChild>
      <Link href={href}>
        <a>{title}</a>
      </Link>
    </NavigationMenuPrimitive.Link>
  );
};

interface MenuLink {
  kind: "link";
  href: string;
  title: string;
}

interface MenuList {
  kind: "list";
  title: string;
  list: MenuLink[];
}
