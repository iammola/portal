import { VoidFunctionComponent } from "react";
import { useNProgress } from "@tanem/react-nprogress";

import { classNames } from "utils";

export const Loading: VoidFunctionComponent<{ isAnimating: boolean }> = (props) => {
  const { animationDuration, isFinished, progress } = useNProgress(props);

  return (
    <div
      style={{ transitionDuration: `${animationDuration}ms` }}
      className={classNames("pointer-events-none transition-opacity", { "opacity-0": isFinished })}
    >
      <div
        style={{
          marginLeft: `${(-1 + progress) * 100}%`,
          transitionDuration: `${animationDuration}ms`,
        }}
        className="fixed left-0 top-0 z-50 h-[4px] w-full rounded-r-full bg-[#29d]  transition-[margin-left]"
      >
        <div
          style={{ boxShadow: "0 0 10px #29d, 0 0 5px #29d" }}
          className="absolute right-0 block h-full w-[100px] translate-x-0 translate-y-[-4px] rotate-3"
        />
      </div>
    </div>
  );
};
