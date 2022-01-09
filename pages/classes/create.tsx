import Head from "next/head";

import type { NextPage } from "next";

const CreateClass: NextPage = () => {
    return (
        <main className="flex flex-row items-stretch justify-center w-screen h-full min-h-screen bg-slate-50 dark:bg-slate-900">
            <Head>
                <title>Create Class | GRIS Portal</title>
                <meta name="description" content="Create class" />
            </Head>
            <section className="flex flex-col items-start justify-start flex-grow w-full">
                <h1 className="text-5xl font-semibold text-gray-600 dark:text-gray-300 p-10">
                    <span>Create a</span>{" "}
                    <span className="bg-clip-text bg-gradient-to-br from-emerald-300 to-emerald-600 text-transparent">
                        Class
                    </span>
                </h1>
                <div className="flex flex-row items-center justify-center self-center h-full py-4">
                    <form className="w-[60rem] h-[35rem] bg-slate-50 dark:bg-slate-300 rounded-2xl overflow-hidden shadow-lg" />
                </div>
            </section>
        </main>
    );
};

export default CreateClass;
