import { FunctionComponent, useState } from "react";

import { classNames } from "utils";
import { useIsomorphicLayoutEffect } from "hooks";

export const Online: FunctionComponent = () => {
  const [onLine, setOnLine] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setOnLine(navigator.onLine);
    const setOnline = () => setOnLine(true);
    const setOffline = () => setOnLine(false);

    addEventListener("online", setOnline);
    addEventListener("offline", setOffline);

    return () => {
      removeEventListener("online", setOnline);
      removeEventListener("offline", setOffline);
    };
  }, []);

  return (
    <div className="group absolute top-0 right-0 h-3 w-3 cursor-pointer">
      <div className={classNames("h-3 w-3 rounded-full ring ring-white", [onLine, "bg-green-600", "bg-red-600"])} />
      <div
        className={classNames("absolute inset-0 h-3 w-3 animate-ping rounded-full opacity-75", [
          onLine,
          "bg-green-500",
          "bg-red-500",
        ])}
      />
      <div className="absolute left-3 -top-8 hidden min-w-max items-center justify-center gap-x-2 rounded-lg bg-white p-2.5 text-xs shadow group-hover:flex">
        <span>{onLine ? "👍" : "👎"}</span>{" "}
        <span className="tracking-wider text-gray-600">{onLine ? "Online" : "Offline"}</span>
      </div>
    </div>
  );
};
