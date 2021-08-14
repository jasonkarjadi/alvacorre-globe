import { ChakraProvider } from "@chakra-ui/react";

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <ChakraProvider resetCSS>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
