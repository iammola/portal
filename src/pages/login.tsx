import { NextPage } from "next";
import { format } from "date-fns";
import { Fragment, useState } from "react";
import Head from "next/head";

import { Checkbox, Input, Password, Select } from "components/Form";

const Login: NextPage = () => {
  const [levels] = useState(() => [
    { value: "student", text: "👨‍🎓 Student" },
    { value: "parent", text: "👨‍👩‍👦 Parent" },
    { value: "teacher", text: "👨‍🏫 Teacher" },
  ]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState(levels[0].value);
  const [remember, setRemember] = useState(false);

  return (
    <Fragment>
      <Head>
        <title>Login &middot; Portal</title>
      </Head>
      <header className="flex items-center justify-between border-b border-gray-6 p-5 dark:border-gray-dark-6">
        <h2 className="text-xl font-semibold text-gray-12 dark:text-gray-dark-12">School Portal</h2>
        <time
          dateTime={format(new Date(), "yyyy-MM-dd")}
          className="text-sm font-light text-gray-11 dark:text-gray-dark-11"
        >
          {format(new Date(), "E, do LLLL yyyy")}
        </time>
      </header>
      <section className="flex grow flex-col items-center justify-center gap-10 py-10 px-6 md:flex-row md:gap-14 md:px-12 lg:px-24">
        <div className="max-w-md">
          <p className="text-center text-5xl font-bold leading-relaxed text-gray-12 dark:text-gray-dark-12 md:text-left">
            Log in to your account
          </p>
        </div>
        <form className="w-full max-w-[350px] space-y-10">
          <div className="space-y-7">
            <Input required value={username} onChange={setUsername} autoComplete="username">
              Username
            </Input>
            <Password required value={password} onChange={setPassword} autoComplete="current-password">
              Password
            </Password>
            <Select required label="Access Level" value={level} onValueChange={setLevel}>
              {levels.map(({ value, text }) => (
                <Select.Item key={value} value={value}>
                  {text}
                </Select.Item>
              ))}
            </Select>
            <Checkbox checked={remember} onCheckedChange={(e) => setRemember(e as boolean)}>
              Remember me
            </Checkbox>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-black-a-9 p-3 text-white shadow-lg hover:bg-black-a-10 dark:text-gray-dark-12"
          >
            Log In
          </button>
        </form>
      </section>
    </Fragment>
  );
};

export default Login;
