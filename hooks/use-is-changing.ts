import { useEffect, useState } from "react";

export function useIsChanging<V>(value: V) {
  const [changing, setChanging] = useState(false);

  useEffect(() => {
    setChanging(true);
    const timeout = setTimeout(setChanging, 750, false);
    return () => clearTimeout(timeout);
  }, [value]);

  return changing;
}
