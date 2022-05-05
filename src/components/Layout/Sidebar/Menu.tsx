import Link from "next/link";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";

import { cx, USER_COOKIE } from "utils";

import navigation from "./navigation.json";

export const Menu: React.FC = () => {
  const list = useMemo<MenuLink[]>(() => {
    const level = getCookie(USER_COOKIE);
    if (!level) return [];

    return navigation[level as keyof typeof navigation];
  }, []);

  return (
    <NavigationMenuPrimitive.Root orientation="vertical">
      <NavigationMenuPrimitive.List className="w-full space-y-2 py-4 px-3">
        {list.map((item, idx) => (
          <NavigationLink {...item} key={`${idx} - ${item.title}`} />
        ))}
      </NavigationMenuPrimitive.List>
    </NavigationMenuPrimitive.Root>
  );
};

const NavigationLink: React.FC<MenuLink> = ({ title, href }) => {
  const { asPath } = useRouter();
  const isActive = asPath === href;

  return (
    <NavigationMenuPrimitive.Item
      className={cx(
        "rounded-lg hover:bg-gray-4 active:bg-gray-5 dark:hover:bg-gray-dark-4 dark:active:bg-gray-dark-5",
        { "bg-gray-5 dark:bg-gray-dark-5": isActive }
      )}
    >
      <NavigationMenuPrimitive.Link asChild>
        <Link
          href={href}
          className="inline-block w-full px-3 py-2.5 text-sm tracking-wide text-gray-12 dark:text-gray-dark-12"
        >
          {title}
        </Link>
      </NavigationMenuPrimitive.Link>
    </NavigationMenuPrimitive.Item>
  );
};

interface MenuLink {
  href: string;
  title: string;
}