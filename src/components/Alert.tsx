import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

export const AlertDialog = AlertDialogPrimitive.Root;

export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

export const AlertDialogTitle = AlertDialogPrimitive.Title;

export const AlertDialogDescription = AlertDialogPrimitive.Description;

export const AlertDialogAction = AlertDialogPrimitive.Action;

export const AlertDialogCancel = AlertDialogPrimitive.Cancel;

export const AlertDialogContent: React.FC<CP<AlertDialogPrimitive.AlertDialogContentProps>> = ({
  children,
  ...contentProps
}) => {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay className="fixed inset-0 bg-black-a-9" />
      <AlertDialogPrimitive.Content
        {...contentProps}
        className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 sm:max-w-lg"
      >
        {children}
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Portal>
  );
};
