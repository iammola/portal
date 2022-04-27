import { Cross2Icon } from "@radix-ui/react-icons";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext<UseToastProps>({
  add: () => 0,
  remove: () => void 0,
  update: () => void 0,
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<ToastPrimitive.ToastProviderProps> = ({ children, ...providerProps }) => {
  const [count, setCount] = useState(0);
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const add = useCallback<UseToastProps["add"]>(
    (toast) => {
      setCount((count) => ++count);
      setToasts((toasts) => [...toasts, toast]);

      return count + 1;
    },
    [count]
  );

  const remove = useCallback<UseToastProps["remove"]>((id) => {
    return setToasts((toasts) => toasts.filter((_, idx) => idx == id));
  }, []);

  const update = useCallback<UseToastProps["update"]>((id, toast) => {
    return setToasts((toasts) => toasts.map((item, idx) => (idx === id ? toast : item)));
  }, []);

  return (
    <ToastContext.Provider value={{ add, remove, update }}>
      {children}
      <ToastPrimitive.Provider {...providerProps}>
        {toasts.map((toast) => {
          if (toast.kind === "loading") return <LoadingToast {...toast} />;
        })}
        <ToastPrimitive.Viewport className="fixed bottom-0 right-0 z-[99999999] flex w-[390px] max-w-[100vw] flex-col gap-2.5 p-6" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
};

const LoadingToast: React.FC<LoadingToastProps> = ({ kind: _, description, ...toastProps }) => {
  return (
    <ToastPrimitive.Root
      {...toastProps}
      className="flex w-full items-center justify-start gap-2 rounded-md bg-white py-2.5 pl-4 pr-2 shadow-sm shadow-gray-a-9 ring-1 ring-gray-6 dark:bg-gray-dark-3 dark:ring-gray-dark-6"
    >
      <ToastPrimitive.Description className="grow text-sm font-medium tracking-wide text-gray-12 dark:text-gray-dark-12">
        {description}
      </ToastPrimitive.Description>
      <ToastPrimitive.Close
        aria-label="Close"
        className="rounded-full p-1.5 hover:bg-gray-4 active:bg-gray-5 dark:hover:bg-gray-dark-4 dark:active:bg-gray-dark-5"
      >
        <Cross2Icon
          aria-hidden
          className="h-4 w-4 text-gray-11 dark:text-gray-dark-11"
        />
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  );
};

interface UseToastProps {
  remove(id: number): void;
  add(toast: ToastProps): number;
  update(id: number, toast: ToastProps): void;
}

interface LoadingToastProps extends ToastPrimitive.ToastProps {
  kind: "loading";
  description: string;
}

type ToastProps = LoadingToastProps;
