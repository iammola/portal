import Head from "next/head";

import type { NextPage } from "next";

const Home: NextPage = () => {
    return (
        <main className="flex items-center justify-center w-screen h-screen bg-center bg-cover bg-[url(/BG.jpg)]">
            <Head>
                <title>Login Page | Portal | GRS™</title>
                <meta name="description" content="Login Page" />
            </Head>
        </main>
    );
};

export default Home;
