import { FunctionComponent } from "react";

import { UserImage } from "components";

export const Footer: FunctionComponent = () => {
  return (
    <div className="flex items-center gap-x-2 p-4">
      <div className="aspect-square h-12 w-12 overflow-hidden rounded-full shadow">
        <UserImage
          fallbackText="RP"
          src="/Users/005.jpg"
          fallbackClassName="bg-slate-300 tracking-widest text-sm text-gray-600"
        />
      </div>
      <div>
        <div className="truncate text-sm text-slate-700">Rebecca Pearson</div>
        <div className="truncate text-xs tracking-wide text-slate-500">rebecca.pearson@thisisus.com</div>
      </div>
    </div>
  );
};
