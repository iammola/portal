import type * as ToastPrimitiveProps from "@radix-ui/react-toast";

declare global {
  namespace Toast {
    type DefaultProps<K extends string> = {
      kind: K;
      description: string;
    };

    type OtherProps = {
      emoji?: string;
      action?: ToastPrimitiveProps.ToastActionProps & {
        text: string;
        onClick(): void;
      };
    };

    type Hook = {
      remove(id: number): void;
      add(toast: Omit<Props, "open">): number;
      update(id: number, toast: Omit<Props, "open">): void;
    };

    type Loading = ToastPrimitiveProps.ToastProps & DefaultProps<"loading">;
    type Success = ToastPrimitiveProps.ToastProps & DefaultProps<"success"> & OtherProps;
    type Error = ToastPrimitiveProps.ToastProps & DefaultProps<"error"> & OtherProps;

    type LoadingProps = Omit<Loading, "kind">;
    type SuccessProps = Omit<Success, "kind">;
    type ErrorProps = Omit<Error, "kind">;

    type Props = Loading | Success | Error;
  }
}
