import Head from "next/head";

import type { NextPage } from "next";

const CreateClass: NextPage = () => {
    return (
        <main className="flex flex-row items-stretch justify-center w-screen h-full min-h-screen bg-slate-50">
            <Head>
                <title>Create Class | GRIS Portal</title>
                <meta name="description" content="Create class" />
            </Head>
            <section className="flex flex-col items-start justify-start flex-grow w-full">
                <h1 className="text-5xl font-semibold text-gray-600 p-10">
                    <span>Create a</span>{" "}
                    <span className="bg-clip-text bg-gradient-to-br from-emerald-300 to-emerald-600 text-transparent">
                        Class
                    </span>
                </h1>
            </section>
        </main>
    );
};

export default CreateClass;
