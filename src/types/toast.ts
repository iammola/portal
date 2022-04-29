import type * as ToastPrimitiveProps from "@radix-ui/react-toast";

declare global {
  namespace Toast {
    interface DefaultProps<K extends string> {
      kind: K;
      description: string;
    }

    interface ActionProps {
      action?: ToastPrimitiveProps.ToastActionProps & {
        text: string;
        onClick(): void;
      };
    }

    export interface Hook {
      remove(id: number): void;
      add(toast: Omit<Props, "open">): number;
      update(id: number, toast: Omit<Props, "open">): void;
    }

    type Loading = ToastPrimitiveProps.ToastProps & DefaultProps<"loading">;
    type Success = ToastPrimitiveProps.ToastProps & DefaultProps<"success"> & ActionProps;
    type Error = ToastPrimitiveProps.ToastProps & DefaultProps<"error"> & ActionProps;

    export type LoadingProps = Omit<Loading, "kind">;
    export type SuccessProps = Omit<Success, "kind">;
    export type ErrorProps = Omit<Error, "kind">;

    export type Props = Loading | Success | Error;
  }
}
