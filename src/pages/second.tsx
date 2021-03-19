import { Layout, Page } from "@shopify/polaris";
import Head from "next/head";
import Link from "next/link";

const SecondPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <Layout>second</Layout>
        <Link href="/">to main</Link>
      </Page>
    </>
  );
};

export default SecondPage;
