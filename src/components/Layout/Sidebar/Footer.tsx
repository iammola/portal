import { DotIcon } from "@radix-ui/react-icons";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { Avatar } from "components";
import { cx, useOnline } from "utils";

export const Footer: React.FC = () => {
  const { online } = useOnline();

  return (
    <div className="flex w-full items-center gap-x-4 p-4">
      <TooltipPrimitive.Root delayDuration={100}>
        <TooltipPrimitive.Trigger className="relative rounded-full">
          <Avatar
            initials="RP"
            src="/Users/005.jpg"
            name="Rebecca Pearson"
          />
          <Online online={online} />
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          side="top"
          align="center"
          sideOffset={5}
          className="rounded-md inline-flex gap-3 text-gray-11 bg-gray-3 px-4 py-2.5 text-xs tracking-wide ring-1 dark:text-gray-dark-11 ring-gray-7 hover:ring-gray-8"
        >
          {online ? "Online" : "Offline"}
          <DotIcon className={cx([online, "text-green-9 dark:text-green-dark-9", "text-red-9 dark:text-red-dark-9"])} />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
      <div>
        <div className="text-gray-12 truncate text-sm">Rebecca Pearson</div>
        <div className="text-gray-11 truncate text-xs tracking-wide">rebecca.pearson@thisisus.com</div>
      </div>
    </div>
  );
};

const Online: React.FC<{ online: boolean }> = ({ online }) => {
  return (
    <div className="absolute top-0 right-0 h-3 w-3 cursor-pointer">
      <div
        className={cx("h-3 w-3 rounded-full ring ring-white", [
          online,
          "bg-green-9 dark:bg-green-dark-9",
          "bg-red-9 dark:bg-red-dark-9",
        ])}
      />
      <div
        className={cx("absolute inset-0 h-3 w-3 animate-ping rounded-full opacity-75", [
          online,
          "bg-green-10 dark:bg-green-dark-10",
          "bg-red-10 dark:bg-red-dark-10",
        ])}
      />
    </div>
  );
};
