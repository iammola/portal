import { Avatar } from "components";
import { cx, useOnline } from "utils";

export const Footer: React.FC = () => {
  const { online } = useOnline();

  return (
    <div className="flex w-full items-center gap-x-4 p-4">
      <div className="relative ring-1 ring-gray-6 dark:ring-gray-dark-6 rounded-full">
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
        <div className="text-gray-12 truncate text-sm">Rebecca Pearson</div>
        <div className="text-gray-11 truncate text-xs tracking-wide">rebecca.pearson@thisisus.com</div>
      </div>
    </div>
  );
};
