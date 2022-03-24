import Head from "next/head";

import { UserImage } from "components";

import type { NextPage } from "next";

const Dev: NextPage = () => {
  return (
    <main className="flex h-screen w-screen flex-row items-center justify-center bg-slate-200 font-urbane dark:bg-slate-800">
      <Head>
        <title>Development Page</title>
        <meta
          name="description"
          content="Test Components"
        />
      </Head>
      <div className="flex items-center justify-between gap-x-14 rounded-full bg-slate-200 py-4 px-10 shadow">
        <div className="flex flex-col items-center justify-center gap-y-2">
          <div className="aspect-square h-20 w-20 overflow-hidden rounded-full shadow">
            <UserImage
              fallbackText="AA"
              src="/Users/009.jpg"
            />
          </div>
          <span className="text-xs text-slate-800">Local Image</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-y-2">
          <div className="aspect-square h-20 w-20 overflow-hidden rounded-full shadow">
            <UserImage
              src=""
              fallbackText="AB"
              fallbackClassName="bg-slate-600 text-2xl tracking-wider text-white"
            />
          </div>
          <span className="text-xs text-slate-800">Fallback</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-y-2">
          <div className="aspect-square h-20 w-20 overflow-hidden rounded-full shadow">
            <UserImage
              fallbackText="AC"
              src="https://drive.google.com/uc?id=1BtuSZ1AiKFChGGOebDoGCnQPKAwr1BZL&export=download"
            />
          </div>
          <span className="text-xs text-slate-800">Cloud Image</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-y-2">
          <div className="aspect-square h-20 w-20 overflow-hidden rounded-full shadow">
            <UserImage
              src=""
              fallbackMax={3}
              fallbackText="ABCD"
              fallbackClassName="bg-slate-600 text-2xl tracking-wider text-white"
            />
          </div>
          <span className="text-xs text-slate-800">Truncated Fallback</span>
        </div>
      </div>
    </main>
  );
};

export default Dev;
