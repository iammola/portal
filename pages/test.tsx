import { useState } from "react";
import Head from "next/head";

import Textarea from "components/Global/Input/Textarea";
import { classNames } from "utils";

import type { NextPage } from "next";

const Test: NextPage = () => {
    const [value, setValue] = useState("");

    return (
        <main className="flex flex-row items-center justify-center w-screen h-screen bg-white dark:bg-slate-800">
            <Head>
                <title>Test</title>
            </Head>
            <form className="rounded-lg overflow-hidden bg-white px-3 py-8">
                <Textarea className="w-96">
                    <Textarea.Label className="text-sm font-medium text-slate-800">
                        Home Address
                    </Textarea.Label>
                    <Textarea.Field
                        max={265}
                        value={value}
                        onChange={setValue}
                        className={(valid?: boolean) =>
                            classNames(
                                "w-full h-40 p-3 border border-slate-300 focus:border-transparent rounded-lg overflow-hidden focus:outline-none ring-2 ring-transparent focus:ring-blue-400 [-webkit-appearance:none]",
                                {
                                    "focus:ring-emerald-400": valid === true,
                                    "focus:ring-red-400": valid === false,
                                }
                            )
                        }
                    />
                </Textarea>
            </form>
        </main>
    );
};

export default Test;
