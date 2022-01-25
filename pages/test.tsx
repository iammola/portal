import { useState } from "react";
import Head from "next/head";

import Input from "components/Global/Input";

import type { NextPage } from "next";

const Test: NextPage = () => {
    const [value, setValue] = useState("");

    return (
        <main className="flex flex-row items-center justify-center w-screen h-screen bg-slate-200 dark:bg-slate-800">
            <Head>
                <title>Test</title>
            </Head>
            <form className="rounded-lg bg-white p-8">
                <Input.Phone className="space-y-1">
                    <Input.Phone.Label className="font-medium text-slate-500">
                        Phone Number
                    </Input.Phone.Label>
                    <Input.Phone.Field value={value} regionCode="GB" onChange={setValue} />
                </Input.Phone>
            </form>
        </main>
    );
};

export default Test;
