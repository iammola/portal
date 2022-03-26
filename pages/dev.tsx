import Head from "next/head";

import { Layout } from "components";

import type { NextPage } from "next";

const Dev: NextPage = () => {
  return (
    <Layout bodyClassName="bg-slate-100">
      <Head>
        <title>Development Page</title>
        <meta
          name="description"
          content="Test Components"
        />
      </Head>
    </Layout>
  );
};

export default Dev;
