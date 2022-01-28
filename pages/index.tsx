import Head from "next/head";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <main className="flex h-screen w-screen items-center justify-center bg-[url(/BG.jpg)] bg-cover bg-center">
      <Head>
        <title>Login Page | Portal | GRS™</title>
        <meta name="description" content="Login Page" />
      </Head>
    </main>
  );
};

export default Home;
