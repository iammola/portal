import Head from "next/head";

import type { NextPage } from "next";

const InputTest: NextPage = () => {
    return (
        <main className="flex flex-row items-center justify-center w-screen h-screen">
            <Head>
                <title>Input Component Test</title>
            </Head>
            <div className="relative w-[20rem] flex flex-col gap-y-2 items-start justify-start">
                <input
                    id="input"
                    type="email"
                    name="input"
                    placeholder="Email address"
                    className="peer w-full h-[3.75rem] p-2 pl-4 border border-gray-400 rounded-lg overflow-hidden focus:outline-none"
                />
                <label
                    htmlFor="input"
                    className="absolute left-0 -top-6 text-sm text-gray-600 font-semibold"
                >
                    Email address
                </label>
            </div>
        </main>
    );
};

export default InputTest;
