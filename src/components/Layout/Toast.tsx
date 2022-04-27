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
  const [toasts, setToasts] = useState<unknown[]>([]);

  const add = useCallback<UseToastProps["add"]>(
    (toast) => {
      setCount((count) => ++count);
      setToasts((toasts) => [...toasts, toast]);

      return count + 1;
    },
    [count]
  );

  const remove: UseToastProps["remove"] = (id) => setToasts((toasts) => toasts.filter((_, idx) => idx == id));

  const update: UseToastProps["update"] = (id, toast) =>
    setToasts((toasts) => toasts.map((item, idx) => (idx === id ? toast : item)));

  return (
    <ToastContext.Provider value={{ add, remove, update }}>
      {children}
      <ToastPrimitive.Provider {...providerProps}>
        {toasts}
        <ToastPrimitive.Viewport />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
};

interface UseToastProps {
  remove(id: number): void;
  add(toast: unknown): number;
  update(id: number, toast: unknown): void;
}
