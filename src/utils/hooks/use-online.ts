import { useCallback, useEffect, useRef } from "react";

import { useToast } from "components";
import { OFFLINE_MESSAGE, ONLINE_MESSAGE } from "utils";

export function useOnline() {
  const toasts = useToast();
  const toastID = useRef<number>();

  const handleOnline = useCallback(() => {
    const isOnline = navigator.onLine;

    if (!isOnline && toastID.current === undefined) {
      toastID.current = toasts.add({
        kind: "error",
        description: OFFLINE_MESSAGE,
      });
    }

    if (isOnline && toastID.current !== undefined) {
      toasts.remove(toastID.current);
      toasts.add({
        duration: 2e3,
        kind: "success",
        description: ONLINE_MESSAGE,
      });
      toastID.current = undefined;
    }
  }, [toasts]);

  useEffect(() => {
    handleOnline();
    addEventListener("online", handleOnline);
    addEventListener("offline", handleOnline);

    return () => {
      removeEventListener("online", handleOnline);
      removeEventListener("offline", handleOnline);
    };
  }, [handleOnline]);

  return { online: toastID === undefined };
}
