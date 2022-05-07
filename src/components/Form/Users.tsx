import * as LabelPrimitive from "@radix-ui/react-label";
import { useId } from "react";

export const Users: React.FC<UsersProps> = ({ children, id, onChange, ...props }) => {
  const customId = useId();

  return (
    <div className="flex flex-col items-start justify-center gap-1">
      <LabelPrimitive.Root
        htmlFor={id || customId}
        className="flex w-full select-none items-center justify-between gap-4"
      >
        <span className="text-sm font-medium tracking-wide text-gray-12 dark:text-gray-dark-12">{children}</span>
        {!props.required && <span className="text-xs text-gray-11 dark:text-gray-dark-11">Optional</span>}
      </LabelPrimitive.Root>
      <textarea
        {...props}
        id={id || customId}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Use @username to mention a user"
        className="min-h-[100px] min-w-[375px] rounded-md bg-gray-3 p-4 text-xs tracking-wide placeholder:text-gray-11 focus:outline-none focus:ring-2 focus:ring-gray-7 dark:bg-gray-dark-3 dark:placeholder:text-gray-dark-11 dark:focus:ring-gray-dark-7"
      />
    </div>
  );
};

interface UsersProps extends Omit<React.ComponentProps<"textarea">, "value" | "onChange"> {
  value?: string;
  children: string;
  onChange(val: string): void;
}
