import Image from "next/image";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

export const Avatar: React.FC = () => {
  return (
    <AvatarPrimitive.Root>
      <AvatarPrimitive.Image asChild>
        <Image src="" />
      </AvatarPrimitive.Image>
      <AvatarPrimitive.Fallback delayMs={600} />
    </AvatarPrimitive.Root>
  );
};
