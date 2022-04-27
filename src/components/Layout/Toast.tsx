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
        {toasts}
        <ToastPrimitive.Viewport className="fixed bottom-0 right-0 z-[99999999] flex w-[390px] max-w-[100vw] flex-col gap-2.5 p-6" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
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
