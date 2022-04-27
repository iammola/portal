import Image from "next/image";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

export const Avatar: React.FC = () => {
  return (
    <AvatarPrimitive.Root className="relative inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full bg-black-a-3 align-middle dark:bg-white-a-3">
      <AvatarPrimitive.Image asChild>
        <Image
          src=""
          layout="fill"
          className="h-full w-full rounded-[inherit] object-cover"
        />
      </AvatarPrimitive.Image>
      <AvatarPrimitive.Fallback
        delayMs={600}
        className="grid h-full w-full place-items-center bg-white text-sm font-medium text-black-a-11 dark:bg-black dark:text-white-a-11"
      />
    </AvatarPrimitive.Root>
  );
};
