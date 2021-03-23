import { Layout, Page } from "@shopify/polaris";
import Link from "next/link";
import {
  useProductsQuery,
  usePromosQuery,
} from "../../codegen/generated/graphql";

const SecondPage = () => {
  const { data } = usePromosQuery();
  const { data: productsData } = useProductsQuery();

  console.log({ data, productsData });
  return (
    <Page>
      <Layout>second</Layout>
      <Link href="/">to main</Link>
      <button>pay</button>
    </Page>
  );
};

export default SecondPage;
