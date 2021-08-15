import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";

const MyApp = ({ Component, pageProps }: any) => {
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
