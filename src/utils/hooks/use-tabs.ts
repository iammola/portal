import { useState } from "react";
import { useRouter } from "next/router";

import { useIsomorphicLayoutEffect } from "utils";

export function useTabs<T extends string>(tabs: T[], defaultIndex = 0) {
  const router = useRouter();
  const [active, setActive] = useState(-1);

  useIsomorphicLayoutEffect(() => {
    if (!router.isReady) return;

    const {
      pathname,
      query: { tab, ...query },
    } = router;

    if (active === -1) {
      const idx = tabs.indexOf(tab as T);
      return setActive(~idx ? idx : defaultIndex);
    }

    const currentIndex = getCurrentIndex();
    const args = [undefined, { shallow: true }] as const;

    if (![defaultIndex, currentIndex].includes(active))
      void router.push({ pathname, query: { ...query, tab: tabs[active] } }, ...args);
    else if (currentIndex !== undefined && [active, currentIndex].includes(defaultIndex))
      void router.replace({ pathname, query }, ...args);

    function getCurrentIndex() {
      const idx = tabs.indexOf(tab as T);
      return ~idx ? idx : undefined;
    }
  }, [active, defaultIndex, router, tabs]);

  return [active, setActive] as const;
}
