import Head from "next/head";
import { SWRConfig } from "swr";
import { ThemeProvider } from "next-themes";

import "style.css";
import { fetchAPIEndpoint } from "api/client";
import { Layout } from "components/Layout";

import type { AppProps } from "next/app";

const App = ({ Component, pageProps, router }: AppProps): JSX.Element => {
  return (
    <SWRConfig value={{ fetcher: fetchAPIEndpoint }}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1c1d1e" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </Head>
      <ThemeProvider attribute="class" defaultTheme="system">
        <Layout hideSidebar={["/_error", "/login"].includes(router.route)}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SWRConfig>
  );
};

export default App;
