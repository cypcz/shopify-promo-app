import { ResourcePicker, TitleBar } from "@shopify/app-bridge-react";
import { EmptyState, Layout, Page } from "@shopify/polaris";
import Link from "next/link";
import { useState } from "react";

const IndexPage = () => {
  const [open, setOpen] = useState(false);
  const handleSelection = (resources: any) => {
    const idsFromResources = resources.selection.map(
      (product: any) => product.id,
    );
    console.log(idsFromResources);
    setOpen(false);
    //  localStorage.setItem("ids", idsFromResources);
  };
  return (
    <Page>
      <TitleBar
        title="Sample App"
        primaryAction={{
          content: "Select products",
          onAction: () => setOpen(true),
        }}
      />
      <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={open}
        onSelection={(resources) => handleSelection(resources)}
        onCancel={() => setOpen(false)}
      />
      <Layout>
        <Link href="/second">to second</Link>
        <EmptyState
          heading="Discount your products temporarily"
          action={{
            content: "Select products",
            onAction: () => setOpen(true),
          }}
          image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
        >
          <p>Select products to change their price temporarily.</p>
        </EmptyState>
      </Layout>
    </Page>
  );
};

export default IndexPage;
