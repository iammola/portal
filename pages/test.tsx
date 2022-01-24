import { useState } from "react";
import Head from "next/head";

import Input from "components/Global/Input";

import type { NextPage } from "next";

const Test: NextPage = () => {
    const [value, setValue] = useState<Date>();

    return (
        <main className="flex flex-row items-center justify-center w-screen h-screen bg-slate-200 dark:bg-slate-800">
            <Head>
                <title>Test</title>
            </Head>
            <form className="rounded-lg overflow-hidden bg-white p-8">
                <Input.Date className="space-y-5">
                    <Input.Date.Label className="font-semibold text-slate-600 tracking-wide">
                        Date of Birth
                    </Input.Date.Label>
                    <Input.Date.Field
                        value={value}
                        onChange={setValue}
                        min={new Date(2004, 11, 10)}
                        max={new Date(2014, 11, 10)}
                        className="flex flex-row gap-x-4 items-center justify-start"
                    />
                </Input.Date>
            </form>
        </main>
    );
};

export default Test;
