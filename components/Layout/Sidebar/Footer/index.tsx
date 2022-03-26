import { FunctionComponent } from "react";

import { UserImage } from "components";

import { Online } from "./Online";

export const Footer: FunctionComponent = () => {
  return (
    <div className="flex w-full items-center gap-x-4 p-4">
      <div className="relative aspect-square h-12 w-12">
        <div className="h-full w-full overflow-hidden rounded-full shadow">
          <UserImage
            fallbackText="RP"
            src="/Users/005.jpg"
            fallbackClassName="bg-slate-300 tracking-widest text-sm text-gray-600"
          />
        </div>
        <Online />
      </div>
      <div>
        <div className="truncate text-sm text-slate-700">Rebecca Pearson</div>
        <div className="truncate text-xs tracking-wide text-slate-500">rebecca.pearson@thisisus.com</div>
      </div>
    </div>
  );
};
