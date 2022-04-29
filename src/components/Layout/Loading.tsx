import { useNProgress } from "@tanem/react-nprogress";

import { cx } from "utils";

export const Loading: React.FC<{ isAnimating: boolean }> = (props) => {
  const { animationDuration, isFinished, progress } = useNProgress(props);

  return (
    <div
      style={{ transitionDuration: `${animationDuration}ms` }}
      className={cx("pointer-events-none transition-opacity", { "opacity-0": isFinished })}
    >
      <div
        style={{
          marginLeft: `${(-1 + progress) * 100}%`,
          transitionDuration: `${animationDuration}ms`,
        }}
        className="fixed left-0 top-0 z-50 h-[4px] w-full rounded-r-full bg-[#de1738]  transition-[margin-left]"
      >
        <div
          style={{ boxShadow: "0 0 10px #de1738, 0 0 5px #de1738" }}
          className="absolute right-0 block h-full w-[100px] translate-x-0 translate-y-[-4px] rotate-3"
        />
      </div>
    </div>
  );
};
