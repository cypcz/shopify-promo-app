import { Layout, Navigation, Page, Spinner } from "@shopify/polaris";
import Link from "next/link";
import { useRouter } from "next/router";

const IndexPage = () => {
  const router = useRouter();
  return (
    <div style={{ display: "flex" }}>
      <Navigation location={router.route}>
        <Navigation.Section
          items={[
            {
              url: "/",
              label: "Home",
              onClick: () => router.push("/"),
            },
            {
              url: "/second",
              label: "Second",
              onClick: () => router.push("/second"),
            },
          ]}
        />
      </Navigation>
      <Page>
        <Layout>
          <Link href="/second">to second</Link>
          <Spinner accessibilityLabel="Spinner example" size="large" />
        </Layout>
      </Page>
    </div>
  );
};

export default IndexPage;
