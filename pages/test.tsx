import Head from "next/head";

import type { NextPage } from "next";

const InputTest: NextPage = () => {
    return (
        <main className="flex flex-row items-center justify-center w-screen h-screen">
            <Head>
                <title>Input Component Test</title>
            </Head>
            <div className="relative w-[20rem]">
                <input
                    id="input"
                    type="email"
                    name="input"
                    placeholder="Email address"
                    className="peer w-full h-[3.75rem] p-2 pl-4 border border-gray-400 rounded-lg overflow-hidden focus:outline-none placeholder-transparent"
                />
                <label
                    htmlFor="input"
                    className="absolute left-[-.4rem] p-1 text-gray-800 transition-all text-sm -top-3.5 font-medium bg-white tracking-wide peer-focus:text-sm peer-focus:left-[-.4rem] peer-focus:top-[-.95rem] peer-focus:bg-white peer-focus:font-medium peer-focus:tracking-wide peer-placeholder-shown:left-3 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:bg-transparent peer-placeholder-shown:tracking-normal"
                >
                    Email address
                </label>
            </div>
        </main>
    );
};

export default InputTest;
