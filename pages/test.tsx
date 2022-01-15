import { useState } from "react";
import Head from "next/head";

import InputBox from "components/Global/Input/Box";

import type { NextPage } from "next";

const Test: NextPage = () => {
    const [value, setValue] = useState<{ _id: string; value: string }[]>([]);

    return (
        <main className="flex flex-row items-center justify-center w-screen h-screen bg-slate-50">
            <Head>
                <title>Test</title>
            </Head>
            <InputBox className="flex flex-col gap-y-4 items-start justify-start w-[25rem] h-[15rem] font-poppins">
                <InputBox.Label className="font-medium text-gray-800">Teachers</InputBox.Label>
                <InputBox.Main
                    values={value}
                    addValue={(v) => setValue([...value, v])}
                    removeValue={(i) => setValue(value.filter((v) => v._id !== i))}
                    className="flex flex-row flex-wrap flex-grow gap-y-2 content-start items-center justify-start w-full p-3 border border-gray-300 focus:border-transparent bg-white rounded-lg overflow-hidden focus:outline-none ring-2 ring-transparent focus:ring-blue-500"
                />
            </InputBox>
        </main>
    );
};

export default Test;
