import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useTabs<T extends string>(defaultTab: T) {
  const router = useRouter();
  const [active, setActive] = useState<T>();

  useEffect(() => {
    if (!router.isReady) return;

    const {
      pathname,
      query: { tab: current, ...query },
    } = router;

    if (active === undefined) return setActive((current as T) ?? defaultTab);

    const args = [undefined, { shallow: true }] as const;

    if (![defaultTab, current].includes(active))
      void router.push({ pathname, query: { ...query, tab: active } }, ...args);
    else if (current !== undefined && [active, current].includes(defaultTab))
      void router.replace({ pathname, query }, ...args);
  }, [active, defaultTab, router]);

  return [active, setActive] as const;
}
