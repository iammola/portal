import Head from "next/head";

import type { NextPage } from "next";

const InputTest: NextPage = () => {
    return (
        <main className="flex flex-row items-center justify-center w-screen h-screen bg-slate-900">
            <Head>
                <title>Input Component Test</title>
            </Head>
            <div className="relative">
                <label htmlFor="input" className="text-gray-800 font-medium"></label>
                <input
                    id="input"
                    type="text"
                    name="input"
                    className="w-full border border-gray-300 rounded-md overflow-hidden focus:outline-none"
                />
            </div>
        </main>
    );
};

export default InputTest;
