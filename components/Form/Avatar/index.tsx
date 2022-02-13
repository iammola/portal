import Image from "next/image";
import { XIcon } from "@heroicons/react/outline";
import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";

import Placeholder from "./Placeholder";

const Avatar: Avatar = ({ value, ...props }) => {
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

  const getFileDataURI = async (file: File) =>
    await new Promise<string | undefined>((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", (e) =>
        resolve(e.target?.result as string)
      );
      reader.readAsDataURL(file);
    });

  function removeImage() {
    setSrc("");
    setUnoptimized(false);
    setFileName(undefined);
  }

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file != undefined) {
      const src = (await getFileDataURI(file)) ?? "";

      setSrc(src);
      setUnoptimized(true);
      setFileName(file.name);

      if (props.returnAs === "base64") props.onChange(src);
      else props.onChange(file);
    }
  }

  return (
    <div className="flex w-full flex-row items-center justify-start gap-x-2">
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
        accept="image/*"
        onChange={handleChange}
        className="w-[116px] rounded-full text-sm text-transparent file:cursor-pointer file:rounded-full file:border-none file:bg-blue-200 file:px-4 file:py-2 file:font-medium file:tracking-wide file:text-blue-700 hover:file:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-white"
      />
      <span className="truncate text-sm font-medium tracking-wide text-slate-500">
        {fileName ?? "no file selected"}
      </span>
    </div>
  );
};

type Avatar = FunctionComponent<
  (
    | {
        returnAs?: "file";
        onChange(v: File): void;
      }
    | {
        returnAs: "base64";
        onChange(v: string): void;
      }
  ) & {
    value?: File | string;
  }
>;

export default Avatar;
