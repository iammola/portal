import { useId } from "react";

export const LoadingIcon: React.FC<React.ComponentProps<"svg">> = (props) => {
  const id = useId();

  // By Sam Herbert @ https://github.com/SamHerbert/SVG-Loaders
  return (
    <svg
      {...props}
      aria-hidden
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          x1="8.042%"
          y1="0%"
          x2="65.682%"
          y2="23.865%"
          id={id}
        >
          <stop
            offset="0%"
            stopOpacity="0"
            stopColor="currentColor"
          />
          <stop
            offset="63.146%"
            stopOpacity=".631"
            stopColor="currentColor"
          />
          <stop
            offset="100%"
            stopColor="currentColor"
          />
        </linearGradient>
      </defs>
      <g
        fill="none"
        fillRule="evenodd"
        transform="translate(1 1)"
      >
        <path
          strokeWidth="2"
          stroke={`url(#${id})`}
          d="M36 18c0-9.94-8.06-18-18-18"
        />
        <circle
          r="1"
          cx="36"
          cy="18"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
