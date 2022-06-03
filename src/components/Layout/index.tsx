import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { ToastProvider } from "components/Toast";

import { Loading } from "./Loading";
import { Sidebar } from "./Sidebar";
import { ThemePicker } from "./Theme";

export const Layout: React.FC<CP<LayoutProps>> = ({ children, hideSidebar }) => {
  const router = useRouter();
  const [key, setKey] = useState(0);
  const [routeChanging, setRouteChanging] = useState(false);

  useEffect(() => {
    const handleStop = () => setRouteChanging(false);
    const handleStart = () => {
      setRouteChanging(true);
      setKey((key) => key ^ 1);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router.events]);

  return (
    <main className="relative flex h-screen w-screen items-stretch overflow-hidden font-sans">
      <ToastProvider>
        {!hideSidebar && <Sidebar />}
        <section className="flex h-full grow flex-col justify-start overflow-y-auto bg-white dark:bg-slate-dark-1">
          {children}
        </section>
      </ToastProvider>
      <Loading key={key} isAnimating={routeChanging} />
      <ThemePicker />
    </main>
  );
};

type LayoutProps = {
  /** Hide sidebar in `/login` route */
  hideSidebar: boolean;
};
