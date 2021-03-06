import { Cross2Icon } from "@radix-ui/react-icons";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { createContext, useCallback, useContext, useState } from "react";

import { LoadingIcon } from "components/Icons";

const ToastContext = createContext<Toast.Hook>({
  add: () => 0,
  remove: () => void 0,
  update: () => void 0,
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<ToastPrimitive.ToastProviderProps> = ({ children, ...providerProps }) => {
  const [toasts, setToasts] = useState<Toast.Props[]>([]);

  const add = useCallback<Toast.Hook["add"]>(
    (toast) => {
      setToasts((toasts) => [...toasts, toast]);
      return toasts.length;
    },
    [toasts]
  );

  const remove = useCallback<Toast.Hook["remove"]>(
    (id) => setToasts((toasts) => toasts.map((toast, idx) => Object.assign(toast, idx === id && { open: false }))),
    []
  );

  const update = useCallback<Toast.Hook["update"]>(
    (id, toast) =>
      setToasts((toasts) =>
        toasts[id].open === false ? toasts : toasts.map((item, idx) => (idx === id ? toast : item))
      ),
    []
  );

  return (
    <ToastContext.Provider value={{ add, remove, update }}>
      {children}
      <ToastPrimitive.Provider {...providerProps}>
        {toasts.map(({ kind, ...toast }, idx) => {
          const props = { key: idx, ...toast };

          if (kind === "loading") return <LoadingToast {...props} />;
          if (kind === "success") return <SuccessToast {...props} />;
          if (kind === "error") return <ErrorToast {...props} />;
        })}
        <ToastPrimitive.Viewport className="fixed bottom-0 right-0 z-30 mb-[50px] flex w-[390px] max-w-[100vw] flex-col gap-2.5 p-6" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
};

const LoadingToast: React.FC<Toast.LoadingProps> = ({ description, ...toastProps }) => {
  return (
    <ToastPrimitive.Root
      {...toastProps}
      className="flex h-12 w-full items-center justify-start gap-2 rounded-md bg-white py-2.5 pl-4 pr-2 ring-1 ring-gray-6 dark:bg-gray-dark-3 dark:ring-gray-dark-6"
    >
      <LoadingIcon className="mr-1 h-5 w-5 animate-spin stroke-gray-11 dark:stroke-gray-dark-11" />
      <ToastPrimitive.Description className="grow truncate text-sm font-medium tracking-wide text-gray-12 dark:text-gray-dark-12">
        {description}
      </ToastPrimitive.Description>
      <ToastPrimitive.Close
        aria-label="Close"
        className="rounded-full p-1.5 hover:bg-gray-4 active:bg-gray-5 dark:hover:bg-gray-dark-4 dark:active:bg-gray-dark-5"
      >
        <Cross2Icon aria-hidden className="h-4 w-4 text-gray-11 dark:text-gray-dark-11" />
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  );
};

const SuccessToast: React.FC<Toast.SuccessProps> = ({ action, emoji, description, ...toastProps }) => {
  return (
    <ToastPrimitive.Root
      {...toastProps}
      className="flex h-12 w-full items-center justify-start gap-2 rounded-md bg-white py-2.5 pl-4 pr-2 ring-1 ring-green-6 dark:bg-gray-dark-3 dark:ring-green-dark-6"
    >
      <ToastPrimitive.Description className="grow truncate text-sm font-medium tracking-wide text-gray-12 dark:text-gray-dark-12">
        <span className="mr-4 text-base">{emoji}</span>
        {description}
      </ToastPrimitive.Description>
      {action ? (
        <ToastPrimitive.Action
          {...action}
          className="inline-flex items-center justify-center rounded bg-green-2 py-1 px-2.5 text-xs font-medium text-green-11 ring-1 ring-green-7 hover:ring-green-8 dark:bg-green-dark-2 dark:text-green-dark-11 dark:ring-green-dark-7 dark:hover:ring-green-dark-8"
        >
          {action.text}
        </ToastPrimitive.Action>
      ) : (
        <ToastPrimitive.Close
          aria-label="Close"
          className="rounded-full p-1.5 hover:bg-gray-4 active:bg-gray-5 dark:hover:bg-gray-dark-4 dark:active:bg-gray-dark-5"
        >
          <Cross2Icon aria-hidden className="h-4 w-4 text-gray-11 dark:text-gray-dark-11" />
        </ToastPrimitive.Close>
      )}
    </ToastPrimitive.Root>
  );
};

const ErrorToast: React.FC<Toast.ErrorProps> = ({ action, emoji, description, ...toastProps }) => {
  return (
    <ToastPrimitive.Root
      {...toastProps}
      className="flex h-12 w-full items-center justify-start gap-2 rounded-md bg-white py-2.5 pl-4 pr-2 ring-1 ring-red-6 dark:bg-gray-dark-3 dark:ring-red-dark-6"
    >
      <ToastPrimitive.Description className="grow truncate text-sm font-medium tracking-wide text-gray-12 dark:text-gray-dark-12">
        <span className="mr-4 text-base">{emoji}</span>
        {description}
      </ToastPrimitive.Description>
      {action ? (
        <ToastPrimitive.Action
          {...action}
          className="inline-flex items-center justify-center rounded bg-red-2 py-1 px-2.5 text-xs font-medium text-red-11 ring-1 ring-red-7 hover:ring-red-8 dark:bg-red-dark-2 dark:text-red-dark-11 dark:ring-red-dark-7 dark:hover:ring-red-dark-8"
        >
          {action.text}
        </ToastPrimitive.Action>
      ) : (
        <ToastPrimitive.Close
          aria-label="Close"
          className="rounded-full p-1.5 hover:bg-gray-4 active:bg-gray-5 dark:hover:bg-gray-dark-4 dark:active:bg-gray-dark-5"
        >
          <Cross2Icon aria-hidden className="h-4 w-4 text-gray-11 dark:text-gray-dark-11" />
        </ToastPrimitive.Close>
      )}
    </ToastPrimitive.Root>
  );
};
