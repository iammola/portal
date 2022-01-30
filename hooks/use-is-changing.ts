import { useEffect, useState } from "react";

export function useIsChanging<V>(value: V, delay = 5e2) {
  const [changing, setChanging] = useState(false);

  useEffect(() => {
    setChanging(true);
    const timeout = setTimeout(setChanging, delay, false);
    return () => clearTimeout(timeout);
  }, [delay, value]);

  return changing;
}
