import { Redirect } from "@shopify/app-bridge/actions";
import { Layout, Page } from "@shopify/polaris";
import Link from "next/link";
import {
  useCreatePaymentMutation,
  useProductsQuery,
  usePromosQuery,
} from "../../codegen/generated/graphql";
import { redirect } from "../bridge";

const SecondPage = () => {
  const { data } = usePromosQuery();
  const { data: productsData } = useProductsQuery();
  const [createPayment] = useCreatePaymentMutation();

  const handlePayment = async () => {
    const { data } = await createPayment();
    data?.createPayment &&
      redirect.dispatch(Redirect.Action.ADMIN_PATH, data.createPayment);
  };

  console.log({ data, productsData });
  return (
    <Page>
      <Layout>second</Layout>
      <Link href="/">to main</Link>
      <button onClick={handlePayment}>pay</button>
    </Page>
  );
};

export default SecondPage;
