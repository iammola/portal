import { Fragment, useState } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";

import { cx } from "utils";
import { useOnline } from "hooks";
import { Avatar } from "components/Avatar";

const Menu = dynamic(() => import("./Menu"));

export const Sidebar: React.FC = () => {
  const { online } = useOnline();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <aside
        className={cx(
          "fixed inset-0 z-50 grid h-screen shrink-0 grid-rows-[max-content_minmax(0,_1fr)_repeat(2,max-content)] overflow-x-auto overflow-y-auto bg-gray-2 dark:bg-gray-dark-2 xs:max-w-[20rem] xl:relative",
          [isOpen, "w-screen", "w-0"]
        )}
      >
        {isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="m-3 inline-flex items-center gap-2 justify-self-end rounded-full bg-gray-3 px-4 py-2 text-xs tracking-wide text-gray-12 shadow-md hover:bg-gray-4 focus:outline-none active:bg-gray-5  dark:bg-gray-dark-3 dark:text-gray-dark-12 dark:hover:bg-gray-dark-4 dark:active:bg-gray-dark-5"
          >
            Close
            <Cross2Icon />
          </button>
        )}
        <Menu />
        <SeparatorPrimitive.Root className="h-px w-full bg-gray-6 dark:bg-gray-dark-6" />
        <Footer online={online} />
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed right-0 top-0 z-[-1] hidden h-screen w-[calc(100vw-20rem)] bg-transparent backdrop-blur xs:block xl:hidden"
          />
        )}
      </aside>
      {!isOpen && (
        <TooltipPrimitive.Root delayDuration={100}>
          <TooltipPrimitive.Trigger asChild>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="fixed bottom-4 left-4 z-30 grid place-items-center rounded-full bg-gray-3 p-3 text-gray-12 ring-1 ring-gray-7 hover:bg-gray-4 hover:ring-gray-8 focus:outline-none dark:bg-gray-dark-3 dark:text-gray-dark-12 dark:ring-gray-dark-7 dark:hover:bg-gray-dark-4 dark:hover:ring-gray-dark-8"
            >
              <HamburgerMenuIcon className="h-6 w-6" />
            </button>
          </TooltipPrimitive.Trigger>
          <TooltipPrimitive.Content
            side="top"
            align="center"
            sideOffset={10}
            className="rounded-md bg-gray-3 px-4 py-2.5 text-xs tracking-wide text-gray-12 ring-1 ring-gray-7 hover:ring-gray-8"
          >
            Open Sidebar
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Root>
      )}
    </Fragment>
  );
};

const Footer: React.FC<{ online: boolean }> = ({ online }) => {
  return (
    <div className="flex w-full items-center gap-4 p-4">
      <div className="relative rounded-full ring-1 ring-gray-6 dark:ring-gray-dark-6">
        <Avatar initials="RP" src="" name="Rebecca Pearson" />
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
