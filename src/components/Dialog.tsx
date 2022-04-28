import { forwardRef } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export const Dialog = DialogPrimitive.Root;

export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogTitle = DialogPrimitive.Title;

export const DialogDescription = DialogPrimitive.Description;

export const DialogContent = forwardRef<HTMLDivElement, CP<DialogPrimitive.DialogContentProps>>(
  ({ children, ...contentProps }, forwardedRef) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black-a-9" />
      <DialogPrimitive.Content
        {...contentProps}
        ref={forwardedRef}
        className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 sm:max-w-lg"
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
  )
);

DialogContent.displayName = "DialogContent";
