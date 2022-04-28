import type * as ToastPrimitiveProps from "@radix-ui/react-toast";

declare global {
  namespace Toast {
    export interface Hook {
      remove(id: number): void;
      add(toast: Props): number;
      update(id: number, toast: Props): void;
    }

    interface Loading extends ToastPrimitiveProps.ToastProps {
      kind: "loading";
      description: string;
    }

    export type Props = Loading;
  }
}
