import Head from "next/head";
import Image from "next/image";

import type { NextPage } from "next";

const Me: NextPage = () => {
    return (
        <main className="flex items-stretch justify-center w-screen h-full min-h-screen">
            <Head>
                <title>Profile | Portal | GRS™</title>
                <meta name="description" content="My Profile" />
            </Head>
            <section className="flex flex-col items-center justify-start flex-grow">
                <div className="w-full h-56 relative bg-gradient-to-r from-purple-300 to-slate-100" />
                <div className="w-full flex-grow px-10">
                    <div className="relative flex items-center justify-start w-full h-24">
                        <div className="absolute top-10 -translate-y-1/2 w-44 aspect-square ring-4 ring-white overflow-x-hidden rounded-full shadow-2xl shadow-slate-100 bg-rose-200">
                            <div className="relative w-full h-full rounded-full">
                                <Image
                                    layout="fill"
                                    priority={true}
                                    alt="Portrait 3"
                                    objectFit="cover"
                                    src="/Portrait 3.jpg"
                                    objectPosition="top"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 items-start justify-center ml-44 pl-5">
                            <h3 className="text-4xl text-gray-700">
                                Christina Andrews
                            </h3>
                            <h6 className="text-xs text-gray-500 font-medium tracking-wide">
                                c.andrews@grschool.com
                            </h6>
                        </div>
                    </div>
                    <div className="flex items-center justify-start gap-8 w-full mt-20 border-b border-b-gray-200">
                        <span className="relative inline-block w-max pb-5 text-sm font-medium text-gray-500 hover:text-gray-900 tracking-wide cursor-pointer">
                            My details
                        </span>
                        <span className="relative inline-block w-max pb-5 text-sm font-medium text-gray-500 hover:text-gray-900 tracking-wide cursor-pointer">
                            Profile
                        </span>
                        <span className="relative inline-block w-max pb-5 text-sm font-medium text-gray-900 tracking-wide cursor-pointer">
                            Password
                            <span className="absolute -bottom-px inset-x-0 w-full h-[2px] bg-gray-900 rounded-full" />
                        </span>
                        <span className="relative inline-block w-max pb-5 text-sm font-medium text-gray-500 hover:text-gray-900 tracking-wide cursor-pointer">
                            Team
                        </span>
                        <span className="relative inline-block w-max pb-5 text-sm font-medium text-gray-500 hover:text-gray-900 tracking-wide cursor-pointer">
                            Plan
                        </span>
                        <span className="relative inline-block w-max pb-5 text-sm font-medium text-gray-500 hover:text-gray-900 tracking-wide cursor-pointer">
                            Billing
                        </span>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Me;
