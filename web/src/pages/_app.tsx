import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { createClient, Provider } from "urql";
import { LocaleContext } from "../LocaleContext";

const client = createClient({ url: "http://localhost:4000/graphql" });

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    localStorage.removeItem("chakra-ui-color-mode");
  }, []);

  const [locale, setLocale] = useState("en");

  return (
    <Provider value={client}>
      <LocaleContext.Provider value={[locale, setLocale]}>
        <ChakraProvider resetCSS>
          <Component {...pageProps} />
        </ChakraProvider>
      </LocaleContext.Provider>
    </Provider>
  );
};

export default MyApp;
