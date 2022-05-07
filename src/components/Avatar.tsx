import * as AvatarPrimitive from "@radix-ui/react-avatar";

export const Avatar: React.FC<AvatarProps> = (props) => {
  return (
    <AvatarPrimitive.Root className="inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full bg-black-a-3 align-middle dark:bg-white-a-3">
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

interface AvatarProps {
  src: string;
  name: string;
  initials: string;
}
