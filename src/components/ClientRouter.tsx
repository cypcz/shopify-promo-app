import {
  useClientRouting,
  useRoutePropagation,
} from "@shopify/app-bridge-react";
import { useRouter } from "next/router";

const ClientRouter = () => {
  const router = useRouter();
  useClientRouting(router);
  useRoutePropagation(router.route);

  return null;
};

export default ClientRouter;
