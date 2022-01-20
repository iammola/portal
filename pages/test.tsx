import { useState } from "react";
import Head from "next/head";

import InputBox, { Value } from "components/Global/Input/Box";

import type { NextPage } from "next";

const Test: NextPage = () => {
    const [value, setValue] = useState<Value[]>([]);

    return (
        <main className="flex flex-row items-center justify-center w-screen h-screen bg-white">
            <Head>
                <title>Test</title>
            </Head>
            <InputBox className="flex flex-col gap-y-4 items-start justify-start w-[50rem] font-inter">
                <InputBox.Label className="font-medium text-slate-800">Teachers</InputBox.Label>
                <InputBox.Main
                    values={value}
                    onChange={setValue}
                    className="flex flex-row flex-wrap grow gap-x-3 gap-y-2 items-center justify-start w-full p-3 border border-slate-200 focus:border-transparent bg-white rounded-lg focus:outline-none ring-2 ring-transparent focus:ring-blue-400"
                />
            </InputBox>
        </main>
    );
};

export default Test;
