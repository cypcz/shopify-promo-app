import { ApolloProvider } from "@apollo/client";
import { Provider as AppBridgeProvider } from "@shopify/app-bridge-react";
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/dist/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import { AppProps } from "next/app";
import Head from "next/head";
import { useApollo } from "../apollo";
import { bridgeConfig } from "../bridge";
import ClientRouter from "../components/ClientRouter";

const App = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <AppBridgeProvider config={bridgeConfig}>
          <AppProvider i18n={{ translations }}>
            <ClientRouter />
            <Component {...pageProps} />
          </AppProvider>
        </AppBridgeProvider>
      </ApolloProvider>
    </>
  );
};

export default App;
