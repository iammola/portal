import * as DialogPrimitive from "@radix-ui/react-dialog";

export const Dialog = DialogPrimitive.Root;

export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogTitle = DialogPrimitive.Title;

export const DialogDescription = DialogPrimitive.Description;

export const DialogContent: React.FC<CP<DialogPrimitive.DialogContentProps>> = ({ children, ...contentProps }) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black-a-9" />
      <DialogPrimitive.Content
        {...contentProps}
        className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 sm:max-w-lg"
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
};
