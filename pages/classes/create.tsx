import { useState } from "react";
import Head from "next/head";

import Input from "components/Global/Input";
import { classNames } from "utils";

import type { NextPage } from "next";

const CreateClass: NextPage = () => {
    const [name, setName] = useState("");

    return (
        <main className="flex flex-row items-stretch justify-center w-screen h-full min-h-screen bg-slate-50 dark:bg-slate-900">
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
                    <form className="w-[60rem] h-[35rem] bg-white p-10 rounded-2xl overflow-hidden shadow-lg">
                        <Input
                            required
                            showIcons
                            id="name"
                            type="text"
                            value={name}
                            label="Name"
                            onChange={(v) => setName(v as string)}
                            className={(valid) =>
                                classNames(
                                    "w-[20rem] h-[3.75rem] border placeholder-shown:border-gray-400 rounded-md overflow-hidden focus:outline-none ring-2 focus:ring-blue-400 placeholder-shown:!ring-transparent placeholder-transparent",
                                    {
                                        "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                                            valid === true,
                                        "invalid:ring-red-400 focus:invalid:ring-red-400":
                                            valid === false,
                                    }
                                )
                            }
                        />
                    </form>
                </div>
            </section>
        </main>
    );
};

export default CreateClass;
