import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

export const Root = AlertDialogPrimitive.Root;

export const Trigger = AlertDialogPrimitive.Trigger;

export const Action: React.FC<AlertDialogActionProps> = ({ cancelProps, children, ...props }) => {
  return (
    <div className="flex w-full justify-end gap-6">
      <AlertDialogPrimitive.Cancel
        {...cancelProps}
        className="inline-flex items-center justify-center rounded bg-gray-3 px-4 py-2.5 text-sm font-medium text-gray-11 hover:bg-gray-4 active:bg-gray-5 dark:bg-gray-dark-3 dark:hover:bg-gray-dark-4 dark:active:bg-gray-dark-5"
      >
        Cancel
      </AlertDialogPrimitive.Cancel>
      <AlertDialogPrimitive.Action {...props}>{children}</AlertDialogPrimitive.Action>
    </div>
  );
};

export const Title: React.FC<CP<AlertDialogPrimitive.AlertDialogTitleProps, string>> = ({ children, ...props }) => {
  return (
    <AlertDialogPrimitive.Title {...props} className="text-lg font-medium text-gray-12">
      {children}
    </AlertDialogPrimitive.Title>
  );
};

export const Description: React.FC<CP<AlertDialogPrimitive.AlertDialogDescriptionProps, string>> = ({
  children,
  ...props
}) => {
  return (
    <AlertDialogPrimitive.Description {...props} className="mb-5 text-sm text-gray-11 dark:text-gray-dark-11">
      {children}
    </AlertDialogPrimitive.Description>
  );
};

export const Content: React.FC<CP<AlertDialogPrimitive.AlertDialogContentProps>> = ({ children, ...contentProps }) => {
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

type AlertDialogActionProps = CP<
  AlertDialogPrimitive.AlertDialogActionProps & { cancelProps: AlertDialogPrimitive.AlertDialogCancelProps },
  string
>;
