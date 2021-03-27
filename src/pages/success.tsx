import { Layout, Page } from "@shopify/polaris";
import Link from "next/link";

const SuccessPage = () => {
  return (
    <Page>
      <Layout>payment success</Layout>
      <Link href="/">to main</Link>
    </Page>
  );
};

export default SuccessPage;
