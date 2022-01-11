import Head from "next/head";

import type { NextPage } from "next";

const InputTest: NextPage = () => {
    return (
        <main className="flex flex-row items-center justify-center w-screen h-screen bg-slate-900">
            <Head>
                <title>Input Component Test</title>
            </Head>
            <div className="relative">
                <label htmlFor="input"></label>
                <input id="input" type="text" name="input" />
            </div>
        </main>
    );
};

export default InputTest;
