import Image from "next/image";
import { XIcon } from "@heroicons/react/outline";
import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";

import Placeholder from "./Placeholder";

const UserPortrait: UserPortrait = ({ onChange, value }) => {
  const [src, setSrc] = useState("");
  const [fileName, setFileName] = useState<string>();
  const [unoptimized, setUnoptimized] = useState(false);

  useEffect(() => {
    if (typeof value === "string") {
      setSrc(value);
      setFileName("");
      setUnoptimized(false);
    }
  }, [value]);

  function getDataURI({ target }: ProgressEvent<FileReader>) {
    setUnoptimized(true);
    setSrc((target?.result as string) ?? "");
  }

  function removeImage() {
    setSrc("");
    setUnoptimized(false);
    setFileName(undefined);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file != undefined) {
      const reader = new FileReader();
      reader.addEventListener("load", getDataURI);

      onChange(file);
      setFileName(file.name);
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="flex w-[25rem] flex-row items-center justify-start gap-x-2">
      <div className="relative aspect-square h-[6.5rem] w-[6.5rem] shrink-0 rounded-full bg-slate-300 dark:bg-slate-800">
        {src === "" ? (
          <Placeholder className="w-full rounded-full fill-slate-500 dark:fill-white" />
        ) : (
          <>
            <Image
              layout="fill"
              objectFit="cover"
              alt="Image Preview"
              objectPosition="center"
              {...{ src, unoptimized }}
              className="h-full w-full rounded-full"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-1.5 right-1.5 z-50 h-6 w-6 rounded-full bg-slate-100 p-[5px] shadow-md hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2 focus:ring-offset-white"
            >
              <XIcon className="h-full w-full stroke-slate-600" />
            </button>
          </>
        )}
      </div>
      <input
        type="file"
        onChange={handleChange}
        className="w-[113px] rounded-full text-sm file:cursor-pointer file:rounded-full file:border-none file:bg-blue-200 file:px-4 file:py-2 file:font-medium file:tracking-wide file:text-blue-700 hover:file:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-white"
      />
      <span className="truncate text-sm font-medium tracking-wide text-slate-500">
        {fileName ?? "no file selected"}
      </span>
    </div>
  );
};

type UserPortrait = FunctionComponent<{
  value?: File | string;
  onChange(value: File): void;
}>;

export default UserPortrait;
