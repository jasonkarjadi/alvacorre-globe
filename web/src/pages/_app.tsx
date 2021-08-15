import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { useEffect } from "react";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    localStorage.removeItem("chakra-ui-color-mode");
  }, []);

  return (
    <ChakraProvider resetCSS>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
