import { useCallback, useEffect, useState } from "react";

import { useToast } from "components";
import { NETWORK_STATE } from "utils";

/**
 * It adds a toast when the user goes offline, and removes it when they go back online
 * @returns A boolean value that indicates whether the user is online or not.
 */
export function useOnline() {
  const toasts = useToast();
  const [lastOnline, setLastOnline] = useState(true);
  const [toastIDs, setToastIDs] = useState<number[]>([]);

  const handleOnline = useCallback(() => {
    let toastID = -1;
    const isOnline = navigator.onLine;

    if (!isOnline && lastOnline) {
      toastID = toasts.add({
        kind: "error",
        ...NETWORK_STATE.offline,
      });
    }

    if (isOnline && !lastOnline) {
      toastID = toasts.add({
        duration: 2e3,
        kind: "success",
        ...NETWORK_STATE.online,
      });
    }

    if (toastID > -1) {
      toastIDs.forEach((id) => toasts.remove(id));
      setToastIDs((toastIDs) => [...toastIDs, toastID]);
    }

    setLastOnline(isOnline);
  }, [lastOnline, toastIDs, toasts]);

  useEffect(() => {
    handleOnline();
    addEventListener("online", handleOnline);
    addEventListener("offline", handleOnline);

    return () => {
      removeEventListener("online", handleOnline);
      removeEventListener("offline", handleOnline);
    };
  }, [handleOnline]);

  return { online: lastOnline };
}
