import Head from "next/head";

import type { NextPage } from "next";

const CreateParent: NextPage = () => {
    return (
        <main className="flex flex-row items-stretch justify-center w-screen h-full min-h-screen bg-slate-50 dark:bg-slate-900 font-poppins">
            <Head>
                <title>Create Parent | GRIS Portal</title>
                <meta name="description" content="Create parent" />
            </Head>
            <section className="flex flex-col items-start justify-start flex-grow w-full">
                <h1 className="text-5xl font-semibold text-gray-600 dark:text-gray-300 p-10">
                    <span>Create</span>{" "}
                    <span className="bg-clip-text bg-gradient-to-br from-indigo-300 to-indigo-600 text-transparent">
                        Parent
                    </span>
                </h1>
            </section>
        </main>
    );
};

export default CreateParent;
