import { NextPage } from "next";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { setCookies } from "cookies-next";
import { Fragment, useState } from "react";
import Head from "next/head";

import { useToast } from "components";
import { fetchAPIEndpoint } from "api";
import { Checkbox, Input, Password, Select } from "components/Form";
import { JWT_COOKIE_TOKEN, REDIRECT_QUERY, USER_ID_COOKIE, USER_LEVEL_COOKIE } from "utils";

const Login: NextPage = () => {
  const toasts = useToast();
  const router = useRouter();

  const [levels] = useState(() => [
    { value: "student", emoji: "👨‍🎓", text: "Student" },
    { value: "parent", emoji: "👨‍👩‍👦", text: "Parent" },
    { value: "teacher", emoji: "👨‍🏫", text: "Teacher" },
  ]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState(levels[0].value);
  const [remember, setRemember] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let toastID: number;

    try {
      toastID = toasts.add({ kind: "loading", description: "Authenticating request..." });

      const result = await fetchAPIEndpoint<API.Auth.POST.Data, API.Auth.POST.Body>("/api/login", {
        method: "POST",
        body: { level, remember, password, username },
      });

      toasts.remove(toastID);
      if (result.success) {
        const { _id, token, expires } = result.data;
        const options = {
          path: "/",
          secure: true,
          sameSite: true,
          expires: expires ? new Date(expires) : undefined,
        };

        setCookies(USER_ID_COOKIE, _id, options);
        setCookies(USER_LEVEL_COOKIE, level, options);
        setCookies(JWT_COOKIE_TOKEN, token, options);

        toastID = toasts.add({ kind: "success", description: "Success!!" });

        const toURL = router.asPath
          .replace(router.pathname, (router.query[REDIRECT_QUERY] as string) ?? "/")
          .replace(new RegExp(`([?&])${REDIRECT_QUERY}=.*?(&|(?=&|$))`), (_, g1: string, g2: string) => {
            if (g1 === "?" && g2 !== "") return g1;
            if (g1 === "&" && g2 === "&") return g2;
            return "";
          });

        toasts.remove(toastID);
        await router.push(toURL);
      } else throw result.error;
    } catch (error) {
      console.error(error);
      if (typeof error === "string") toasts.add({ kind: "error", description: error });
      if (typeof error === "object") toasts.add({ kind: "error", description: "Couldn't complete request" });
    }
  }

  return (
    <Fragment>
      <Head>
        <title>Login &middot; Portal</title>
      </Head>
      <header className="flex items-center justify-between border-b border-gray-6 p-5 dark:border-gray-dark-6">
        <h5 className="text-xl font-semibold text-gray-12 dark:text-gray-dark-12">School Portal</h5>
        <time
          dateTime={format(new Date(), "yyyy-MM-dd")}
          className="text-sm font-light text-gray-11 dark:text-gray-dark-11"
        >
          {format(new Date(), "E, do LLLL yyyy")}
        </time>
      </header>
      <section className="flex grow flex-col items-center justify-center gap-10 py-10 px-6 md:flex-row md:gap-14 md:px-12 lg:px-24">
        <div className="max-w-md">
          <h1 className="text-center text-5xl font-bold leading-relaxed text-gray-12 dark:text-gray-dark-12 md:text-left">
            Log in to your account
          </h1>
        </div>
        <form onSubmit={(e) => void handleSubmit(e)} className="w-full max-w-[350px] space-y-10">
          <div className="space-y-7">
            <Input required value={username} onValueChange={setUsername} autoComplete="username">
              Username
            </Input>
            <Password required value={password} onValueChange={setPassword} autoComplete="current-password">
              Password
            </Password>
            <Select required label="Access Level" value={level} onValueChange={setLevel}>
              {levels.map(({ emoji, value, text }) => (
                <Select.Item key={value} value={value}>
                  <div className="flex items-center justify-start gap-3">
                    <span>{emoji}</span>
                    <span>{text}</span>
                  </div>
                </Select.Item>
              ))}
            </Select>
            <Checkbox checked={remember} onCheckedChange={(e) => setRemember(e as boolean)}>
              Remember me
            </Checkbox>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-black-a-9 p-3 text-white shadow-lg hover:bg-black-a-10 focus:outline-none dark:text-gray-dark-12"
          >
            Log In
          </button>
        </form>
      </section>
    </Fragment>
  );
};

export default Login;
