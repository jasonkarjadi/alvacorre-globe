import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { LocaleContext } from "../LocaleContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    localStorage.removeItem("chakra-ui-color-mode");
  }, []);

  const [locale, setLocale] = useState("en");

  return (
    <LocaleContext.Provider value={[locale, setLocale]}>
      <ChakraProvider resetCSS>
        <Component {...pageProps} />
      </ChakraProvider>
    </LocaleContext.Provider>
  );
};

export default MyApp;
