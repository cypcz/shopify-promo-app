import { createApp } from "@shopify/app-bridge";
import { Redirect } from "@shopify/app-bridge/actions";
import Cookies from "js-cookie";
import { NEXT_PUBLIC_SHOPIFY_API_KEY } from "./setup";

const shop = typeof window !== "undefined" && Cookies.get("shopOrigin");

export const bridgeConfig = {
  apiKey: NEXT_PUBLIC_SHOPIFY_API_KEY,
  shopOrigin: shop || "",
  forceRedirect: true,
};

export const bridgeApp = createApp(bridgeConfig);

export const redirect = Redirect.create(bridgeApp);
