import Head from "next/head";

import type { NextPage } from "next";

const CreateClass: NextPage = () => {
    return (
        <main className="flex flex-row items-stretch justify-center w-screen h-full min-h-screen bg-slate-50">
            <Head>
                <title>Create Class | GRIS Portal</title>
                <meta name="description" content="Create class" />
            </Head>
        </main>
    );
};

export default CreateClass;
