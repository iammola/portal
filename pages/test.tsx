import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { CheckIcon, XIcon } from "@heroicons/react/solid";

import { classNames } from "utils";

import type { NextPage } from "next";

const InputTest: NextPage = () => {
    const [value, setValue] = useState("");
    const [valid, setValid] = useState<boolean>();
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
                    required
                    ref={ref}
                    id="input"
                    type="email"
                    name="input"
                    value={value}
                    placeholder="Email address"
                    onChange={(e) => setValue(e.target.value)}
                    className={classNames(
                        "peer w-[20rem] h-[3.75rem] p-2 pl-4 border placeholder-shown:border-gray-400 rounded-lg overflow-hidden focus:outline-none ring-2 focus:ring-blue-400 placeholder-shown:!ring-transparent placeholder-transparent row-start-1",
                        {
                            "valid:ring-emerald-400 focus:valid:ring-emerald-400": valid === true,
                            "invalid:ring-red-400 focus:invalid:ring-red-400": valid === false,
                        }
                    )}
                />
                <label
                    htmlFor="input"
                    className="absolute left-[-.4rem] p-1 text-gray-800 transition-all text-sm -top-3.5 font-medium bg-white tracking-wide peer-focus:text-sm peer-focus:left-[-.4rem] peer-focus:top-[-.95rem] peer-focus:bg-white peer-focus:font-medium peer-focus:tracking-wide peer-placeholder-shown:select-none peer-placeholder-shown:left-3 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:bg-transparent peer-placeholder-shown:tracking-normal"
                >
                    Email address
                    <span className="text-sm text-red-500 pl-0.5 align-middle">*</span>
                </label>
                <CheckIcon
                    className={classNames(
                        "h-5 w-5 fill-emerald-500 peer-placeholder-shown:opacity-0 row-start-1 col-start-2",
                        {
                            "opacity-0": valid !== true,
                        }
                    )}
                />
                <XIcon
                    className={classNames(
                        "h-5 w-5 fill-red-500 peer-placeholder-shown:opacity-0 row-start-1 col-start-2",
                        {
                            "opacity-0": valid !== false,
                        }
                    )}
                />
            </div>
        </main>
    );
};

export default InputTest;
