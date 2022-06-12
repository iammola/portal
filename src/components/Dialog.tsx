import { Cross2Icon } from "@radix-ui/react-icons";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cx } from "utils";

export const Root = DialogPrimitive.Root;

export const Trigger = DialogPrimitive.Trigger;

export const Close = DialogPrimitive.Close;

export const Title: React.FC<CP<DialogPrimitive.DialogTitleProps>> = ({ children, ...props }) => {
  return (
    <DialogPrimitive.Title {...props} className={cx("text-gray-12 dark:text-gray-dark-12", props.className)}>
      {children}
    </DialogPrimitive.Title>
  );
};

export const Description: React.FC<CP<DialogPrimitive.DialogDescriptionProps>> = ({ children, ...props }) => {
  return (
    <DialogPrimitive.Description {...props} className={cx("text-gray-11 dark:text-gray-dark-11", props.className)}>
      {children}
    </DialogPrimitive.Description>
  );
};

export const Content: React.FC<CP<DialogPrimitive.DialogContentProps>> = ({ children, ...contentProps }) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black-a-10" />
      <DialogPrimitive.Content
        {...contentProps}
        className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-md bg-white p-6 dark:bg-gray-dark-2 sm:max-w-lg"
      >
        {children}
        <DialogPrimitive.Close
          aria-label="Close"
          className="absolute top-2.5 right-2.5 inline-flex items-center justify-center rounded-full p-2 text-gray-11 hover:bg-gray-4 dark:hover:bg-gray-dark-4"
        >
          <Cross2Icon className="h-4 w-4" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
};
