import { Avatar } from "components";

import { Online } from "./Online";

export const Footer: React.FC = () => {
  return (
    <div className="flex w-full items-center gap-x-4 p-4">
      <div className="relative">
        <Avatar
          initials="RP"
          src="/Users/005.jpg"
          name="Rebecca Pearson"
        />
        <Online />
      </div>
      <div>
        <div className="text-slate-700 truncate text-sm">Rebecca Pearson</div>
        <div className="text-slate-500 truncate text-xs tracking-wide">rebecca.pearson@thisisus.com</div>
      </div>
    </div>
  );
};
