import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cx } from "utils";

export const Avatar: React.FC<AvatarProps> = (props) => {
  return (
    <AvatarPrimitive.Root
      className={cx(
        "inline-flex aspect-square select-none items-center justify-center overflow-hidden rounded-full bg-black-a-3 align-middle dark:bg-white-a-3",
        props.sizeClassName ?? "h-[45px] w-[45px]"
      )}
    >
      <AvatarPrimitive.Image
        src={props.src}
        alt={props.name}
        className="h-full w-full rounded-[inherit] object-cover"
      />
      <AvatarPrimitive.Fallback
        delayMs={600}
        className="grid h-full w-full place-items-center bg-gray-3 text-sm font-medium text-gray-12 dark:bg-gray-dark-3 dark:text-gray-dark-12"
      >
        {props.initials}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
};
export default Avatar;

type AvatarProps = {
  src: string;
  name: string;
  initials: string;
  sizeClassName?: string;
};
