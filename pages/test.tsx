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
                    className="w-full h-14 p-2 pl-6 border border-gray-300 rounded-lg overflow-hidden focus:outline-none"
                />
                <label htmlFor="input" className="text-gray-800 font-medium tracking-wide">
                    Email address
                </label>
            </div>
        </main>
    );
};

export default InputTest;
