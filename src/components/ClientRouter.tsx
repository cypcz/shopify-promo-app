import { useClientRouting } from "@shopify/app-bridge-react";
import { useRouter } from "next/router";

const ClientRouter = () => {
  const router = useRouter();
  useClientRouting(router);

  return null;
};

export default ClientRouter;
