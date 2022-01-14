import { useCallback, useState } from "react";
import Head from "next/head";

import Input from "components/Global/Input";
import { classNames } from "utils";

import type { NextPage } from "next";

const CreateClass: NextPage = () => {
    const [name, setName] = useState("");
    const [alias, setAlias] = useState("");
    const [special, setSpecial] = useState("");

    const inputClassName = useCallback(
        (valid?: boolean) =>
            classNames(
                "w-[20rem] h-[3.75rem] border placeholder-shown:border-gray-400 focus:border-transparent focus:valid:border-transparent focus:invalid:border-transparent rounded-lg overflow-hidden focus:outline-none ring-2 focus:ring-blue-400 placeholder-shown:ring-transparent placeholder-transparent",
                {
                    "valid:ring-emerald-400 focus:valid:ring-emerald-400": valid === true,
                    "invalid:ring-red-400 focus:invalid:ring-red-400": valid === false,
                }
            ),
        []
    );

    return (
        <main className="flex flex-row items-stretch justify-center w-screen h-full min-h-screen bg-slate-50 dark:bg-slate-900 font-poppins">
            <Head>
                <title>Create Class | GRIS Portal</title>
                <meta name="description" content="Create class" />
            </Head>
            <section className="flex flex-col items-start justify-start flex-grow w-full">
                <h1 className="text-5xl font-semibold text-gray-600 dark:text-gray-300 p-10">
                    <span>Create a</span>{" "}
                    <span className="bg-clip-text bg-gradient-to-br from-emerald-300 to-emerald-600 text-transparent">
                        Class
                    </span>
                </h1>
                <div className="flex flex-row items-center justify-center self-center h-full py-4">
                    <form className="flex flex-col gap-y-4 items-center justify-center bg-white p-10 rounded-2xl overflow-hidden shadow-lg">
                        <Input
                            required
                            id="name"
                            type="text"
                            value={name}
                            label="Name"
                            className={inputClassName}
                            onChange={(v) => setName(v as string)}
                        />
                        <Input
                            required
                            id="alias"
                            type="text"
                            value={alias}
                            label="Alias"
                            className={inputClassName}
                            onChange={(v) => setAlias(v as string)}
                        />
                        <Input
                            required
                            id="special"
                            type="text"
                            value={special}
                            label="Special name"
                            className={inputClassName}
                            onChange={(v) => setSpecial(v as string)}
                        />
                    </form>
                </div>
            </section>
        </main>
    );
};

export default CreateClass;
