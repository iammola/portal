import Image from "next/image";
import { XIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";

import Placeholder from "./Placeholder";

const Avatar: Avatar = ({ value, ...props }) => {
  const [src, setSrc] = useState("");
  const [fileName, setFileName] = useState<string>();

  useEffect(() => {
    if (typeof value === "string") {
      setSrc(value);
      setFileName("");
    }
  }, [value]);

  const getFileDataURI = async (file: File) =>
    await new Promise<string | undefined>((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", (e) => resolve(e.target?.result as string));
      reader.readAsDataURL(file);
    });

  function removeImage() {
    setSrc("");
    setFileName(undefined);
    props.onChange(undefined);
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file != undefined) {
      const src = (await getFileDataURI(file)) ?? "";

      setSrc(src);
      setFileName(file.name);

      if (props.returnAs === "base64") props.onChange(src);
      else props.onChange(file);
    }
  }

  return (
    <div className="flex w-full flex-row items-center justify-start gap-x-2">
      <div className="bg-slate-300 dark:bg-slate-800 relative aspect-square h-[6.5rem] w-[6.5rem] shrink-0 rounded-full">
        {src === "" ? (
          <Placeholder className="fill-slate-500 w-full rounded-full dark:fill-white" />
        ) : (
          <>
            <Image
              src={src}
              unoptimized
              layout="fill"
              objectFit="cover"
              alt="Image Preview"
              objectPosition="center"
              className="h-full w-full rounded-full"
            />
            <button
              type="button"
              onClick={removeImage}
              className="bg-slate-100 hover:bg-slate-200 focus:ring-slate-200 absolute top-1.5 right-1.5 z-50 h-6 w-6 rounded-full p-[5px] shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white"
            >
              <XIcon className="stroke-slate-600 h-full w-full" />
            </button>
          </>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => void handleChange(e)}
        className="file:bg-blue-200 file:text-blue-700 hover:file:bg-blue-300 focus:ring-blue-300 w-[116px] rounded-full text-sm text-transparent file:cursor-pointer file:rounded-full file:border-none file:px-4 file:py-2 file:font-medium file:tracking-wide focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white"
      />
      <span className="text-slate-500 truncate text-sm font-medium tracking-wide">
        {fileName ?? "no file selected"}
      </span>
    </div>
  );
};

type Avatar = React.FC<
  (
    | {
        returnAs?: "file";
        onChange(v?: File): void;
      }
    | {
        returnAs: "base64";
        onChange(v?: string): void;
      }
  ) & {
    value?: File | string;
  }
>;

export default Avatar;