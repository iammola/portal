import { useState } from "react";

import { useIsomorphicLayoutEffect } from "utils";

export function useIsChanging<V>(value: V, delay = 5e2) {
  const [changing, setChanging] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setChanging(true);
    const timeout = setTimeout(setChanging, delay, false);
    return () => clearTimeout(timeout);
  }, [delay, value]);

  return changing;
}
