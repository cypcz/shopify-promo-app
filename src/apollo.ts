import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { createApp } from "@shopify/app-bridge";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { setContext } from "apollo-link-context";
import { useMemo } from "react";
import { NEXT_PUBLIC_SHOPIFY_API_KEY, SHOPIFY_APP_URL } from "./setup";

const shop = new URLSearchParams(
  typeof window === "undefined" ? "" : window.location.search,
).get("shop");

export const bridgeConfig = {
  apiKey: NEXT_PUBLIC_SHOPIFY_API_KEY,
  shopOrigin: shop || "",
  forceRedirect: true,
};

const app = createApp(bridgeConfig);

const authLink = setContext(async () => {
  const token = await getSessionToken(app);
  console.log(token);
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createIsomorphLink() {
  if (typeof window === "undefined") {
    const { SchemaLink } = require("@apollo/client/link/schema");
    const { schema } = require("./schema");
    return new SchemaLink({ schema });
  } else {
    return ApolloLink.from([
      authLink as any,
      createHttpLink({
        uri: `${SHOPIFY_APP_URL}/graphql`,
      }),
    ]);
  }
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createIsomorphLink(),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null,
) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: NormalizedCacheObject) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
