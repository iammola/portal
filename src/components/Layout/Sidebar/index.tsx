import * as Separator from "@radix-ui/react-separator";

import { Avatar } from "components";
import { cx, useOnline } from "utils";

import { Menu } from "./Menu";

export const Sidebar: React.FC = () => {
  const { online } = useOnline();

  return (
    <aside className="fixed inset-0 z-50 grid h-screen w-screen max-w-[20rem] grid-rows-[minmax(0,_1fr)_repeat(2,max-content)] overflow-x-auto overflow-y-auto bg-gray-2 dark:bg-gray-dark-2 md:h-full lg:relative">
      <Menu />
      <Separator.Root className="h-px w-full bg-gray-6" />
      <Footer online={online} />
      <div className="fixed right-0 top-0 z-[-1] hidden h-screen w-[calc(100vw-20rem)] bg-transparent backdrop-blur sm:block lg:hidden" />
    </aside>
  );
};

const Footer: React.FC<{ online: boolean }> = ({ online }) => {
  return (
    <div className="flex w-full items-center gap-4 p-4">
      <div className="relative rounded-full ring-1 ring-gray-6 dark:ring-gray-dark-6">
        <Avatar
          initials="RP"
          src="/Users/005.jpg"
          name="Rebecca Pearson"
        />
        <div
          className={cx("absolute bottom-0.5 right-0.5 h-2 w-2 rounded-full", [
            online,
            "bg-green-9 dark:bg-green-dark-9",
            "bg-red-9 dark:bg-red-dark-9",
          ])}
        />
      </div>
      <div>
        <div className="truncate text-sm font-medium text-gray-12 dark:text-gray-dark-12">Rebecca Pearson</div>
        <div className="truncate text-xs tracking-wide text-gray-11 dark:text-gray-dark-11">
          rebecca.pearson@thisisus.com
        </div>
      </div>
    </div>
  );
};
