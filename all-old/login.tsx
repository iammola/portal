import Head from "next/head";
import Link from "next/link";
import { serialize } from "cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { SelectorIcon } from "@heroicons/react/solid";
import { Listbox, Transition } from "@headlessui/react";

import { Input, Password } from "./components/Form";
import { classNames, JWT_COOKIE_TOKEN, USER_COOKIE, fetchAPIEndpoint } from "utils";

import type { NextPage } from "next";

const levels = [
  { emoji: "👨‍🎓", value: "student" },
  { emoji: "👨‍🏫", value: "teacher" },
  { emoji: "👨‍👩‍👧‍👦", value: "parent" },
];

const Login: NextPage = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [level, setLevel] = useState<{ value: string; emoji: string }>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!level) return;

    try {
      const result = await fetchAPIEndpoint<API.Auth.POST.Data, API.Auth.POST.Body>("/api/auth", {
        method: "POST",
        body: { username, password, remember, level: level.value },
      });

      if (result.success) {
        const { token, expiresIn } = result.data;
        const opts = {
          path: "/",
          secure: true,
          sameSite: true,
          maxAge: expiresIn,
        };

        document.cookie = serialize(JWT_COOKIE_TOKEN, token, opts);
        document.cookie = serialize(USER_COOKIE, level.value, opts);
        void router.push("/");
      } else console.error(result.error);
    } catch (error: unknown) {
      console.error(error);
    }
  }

  return (
    <div className="flex h-full w-full items-stretch justify-center">
      <Head>
        <title>Login | GRS Portal</title>
      </Head>
      <figure className="bg-gray-900 w-[60vw]" />
      <section className="relative flex grow flex-col items-center justify-center gap-y-[4.5rem] bg-white p-5">
        <h1 className="text-gray-600 text-5xl font-light">Sign in to Portal</h1>
        <form
          onSubmit={(e) => void handleSubmit(e)}
          className="flex w-full max-w-lg flex-col items-center justify-center gap-y-6 px-10"
        >
          <div className="w-full space-y-8">
            <div className="flex w-full flex-col items-start justify-center gap-y-1">
              <label
                htmlFor="username"
                className="text-slate-600 text-sm font-light tracking-wider"
              >
                Username
              </label>
              <Input
                required
                id="username"
                value={username}
                onChange={setUsername}
                className="bg-slate-50 text-slate-700 placeholder-slate-200 h-14 w-full rounded-lg border-none pl-6 focus:outline-none"
              />
            </div>
            <Listbox
              as="div"
              value={level}
              onChange={setLevel}
              className="relative flex w-full flex-col items-start justify-center gap-y-1"
            >
              <Listbox.Label className="text-slate-600 text-sm font-light tracking-wider">Account type</Listbox.Label>
              <Listbox.Button className="bg-slate-50 flex h-14 w-full items-center justify-between rounded-lg py-2 px-4">
                {level && (
                  <span
                    style={{ gridTemplateColumns: "max-content 1fr" }}
                    className="text-slate-700 grid items-center gap-x-6 text-sm"
                  >
                    <span className="text-xl">{level.emoji}</span>
                    <span className="text-slate-700 capitalize tracking-wide">{level.value}</span>
                  </span>
                )}
                <SelectorIcon className="fill-slate-600 ml-auto h-5 w-5" />
              </Listbox.Button>
              <Transition
                enter="transition duration-100 ease-in"
                enterFrom="scale-95 opacity-0"
                enterTo="scale-100 opacity-100"
                leave="transition duration-100 ease-out"
                leaveFrom="scale-100 opacity-100"
                leaveTo="scale-95 opacity-0"
                className="absolute top-[5.5rem] z-50 max-h-60 w-full bg-white"
              >
                <Listbox.Options className="h-full w-full overflow-y-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {levels.map((level) => (
                    <Listbox.Option
                      value={level}
                      key={level.value}
                      style={{ gridTemplateColumns: "max-content 1fr" }}
                      className={({ active, selected }) =>
                        classNames(
                          "grid cursor-pointer select-none items-center gap-x-6 py-3 px-4",
                          [selected, "bg-blue-600 text-white", "text-slate-700 bg-white"],
                          {
                            "bg-blue-500": active && selected,
                            "bg-blue-100": active && !selected,
                          }
                        )
                      }
                    >
                      <span className="min-w-0 text-xl">{level.emoji}</span>
                      <span className="min-w-0 capitalize tracking-wider">{level.value}</span>
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
            <div className="flex w-full flex-col items-start justify-center gap-y-1">
              <label
                htmlFor="password"
                className="text-slate-600 text-sm font-light tracking-wider"
              >
                Password
              </label>
              <Password
                required
                id="password"
                value={password}
                onChange={setPassword}
                className="bg-slate-50 text-slate-700 placeholder-slate-200 h-14 w-full rounded-lg border-none pl-6 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-between py-2">
            <div className="flex items-center justify-start gap-x-2">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="border-slate-300 text-blue-500 focus:ring-blue-200 h-[1.15rem] w-[1.15rem] rounded focus:border-transparent focus:ring focus:ring-offset-0"
              />
              <label
                htmlFor="remember"
                className="text-slate-700 text-sm font-light tracking-wide"
              >
                Remember me?
              </label>
            </div>
            <Link href="/recover">
              <a className="text-blue-500 text-sm tracking-wide focus:underline focus:underline-offset-4 focus:outline-none">
                Forgot Password?
              </a>
            </Link>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 focus:ring-blue-300 w-full rounded-lg p-3 text-sm font-medium tracking-wide text-white focus:outline-none focus:ring-2"
          >
            Sign in
          </button>
        </form>
        <span className="text-slate-500 min-w-max text-center text-xs font-light tracking-wide">
          <span className="block">© {new Date().getFullYear()} Grand Regal School.</span>{" "}
          <span className="block">All Rights Reserved</span>
        </span>
      </section>
    </div>
  );
};

export default Login;