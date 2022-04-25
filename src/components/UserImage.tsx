import Image, { ImageProps } from "next/image";
import { FunctionComponent, useState } from "react";

import { classNames } from "utils";

export const UserImage: FunctionComponent<Props> = ({ fallbackClassName, fallbackMax, fallbackText, ...props }) => {
  const [error, setError] = useState(!props.src);

  return (
    <figure className="relative h-full w-full">
      {error ? (
        <Fallback
          className={fallbackClassName}
          max={fallbackMax ?? 2}
          text={fallbackText}
        />
      ) : (
        <Image
          {...props}
          layout="fill"
          alt={props.alt}
          objectFit="cover"
          onError={() => setError(true)}
          onLoadingComplete={() => setError(false)}
          objectPosition={props.objectPosition ?? "center"}
        />
      )}
    </figure>
  );
};

const Fallback: FunctionComponent<FallbackProps> = ({ className, max, text }) => {
  return (
    <figcaption
      className={classNames(className, "absolute inset-0 z-[100000] flex h-full w-full items-center justify-center")}
    >
      {text.slice(0, max === undefined ? 2 : max || text.length)}
    </figcaption>
  );
};

type Props = Omit<ImageProps, "layout" | "objectFit" | "onError" | "onLoadingComplete"> & {
  [K in keyof FallbackProps as `fallback${Capitalize<K>}`]: FallbackProps[K];
};

type FallbackProps = {
  /** Fallback text (e.g. initials) */
  text: string;
  /** Fallback styles */
  className?: string;
  /**
   * Fallback maximum length of text
   * If set to 0, the whole text is used
   * @default 2
   */
  max?: number;
};
