import Head from "next/head";
import { useEffect, useRef, useState } from "react";

import type { NextPage } from "next";

const InputTest: NextPage = () => {
    const [value, setValue] = useState("");
    const [, setValid] = useState<boolean>();
    const ref = useRef<HTMLInputElement>(null);
    const [typing, setTyping] = useState(false);

    useEffect(() => {
        setTyping(true);
        const timeout = setTimeout(setTyping, 750, false);
        return () => clearTimeout(timeout);
    }, [value]);

    useEffect(() => {
        const input = ref.current;
        if (typing === false) setValid(input?.value === "" ? undefined : input?.validity.valid);
    }, [typing]);

    return (
        <main className="flex flex-row items-center justify-center w-screen h-screen">
            <Head>
                <title>Input Component Test</title>
            </Head>
            <div className="relative grid gap-x-2 items-center">
                <input
                    ref={ref}
                    id="input"
                    type="email"
                    name="input"
                    value={value}
                    placeholder="Email address"
                    onChange={(e) => setValue(e.target.value)}
                    className="peer w-[20rem] h-[3.75rem] p-2 pl-4 border placeholder-shown:border-gray-400 rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-400 valid:ring-2 valid:ring-emerald-400 focus:valid:ring-2 focus:valid:ring-emerald-400 placeholder-shown:!ring-transparent placeholder-transparent row-start-1"
                />
                <label
                    htmlFor="input"
                    className="absolute left-[-.4rem] p-1 text-gray-800 transition-all text-sm -top-3.5 font-medium bg-white tracking-wide peer-focus:text-sm peer-focus:left-[-.4rem] peer-focus:top-[-.95rem] peer-focus:bg-white peer-focus:font-medium peer-focus:tracking-wide peer-placeholder-shown:left-3 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:bg-transparent peer-placeholder-shown:tracking-normal"
                >
                    Email address
                </label>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 fill-emerald-500 peer-invalid:opacity-0 peer-placeholder-shown:opacity-0 row-start-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
        </main>
    );
};

export default InputTest;
