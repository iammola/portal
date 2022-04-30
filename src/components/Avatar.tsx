import Image from "next/image";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

export const Avatar: React.FC<AvatarProps> = (props) => {
  return (
    <AvatarPrimitive.Root className="inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full bg-black-a-3 align-middle dark:bg-white-a-3">
      <AvatarPrimitive.Image asChild>
        <Image
          layout="fill"
          src={props.src}
          alt={props.name}
          className="h-full w-full rounded-[inherit] object-cover"
        />
      </AvatarPrimitive.Image>
      <AvatarPrimitive.Fallback
        delayMs={600}
        className="grid h-full w-full place-items-center bg-white text-sm font-medium text-black dark:bg-black dark:text-white"
      >
        {props.initials}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
};

interface AvatarProps {
  src: string;
  name: string;
  initials: string;
}
