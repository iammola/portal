import Head from "next/head";

import type { NextPage } from "next";

const Me: NextPage = () => {
    return (
        <main className="flex items-stretch justify-center w-screen h-full min-h-screen">
            <Head>
                <title>Profile | Portal | GRS™</title>
                <meta name="description" content="My Profile" />
            </Head>
        </main>
    );
};

export default Me;
