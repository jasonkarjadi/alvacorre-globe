import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { useLocalesQuery } from "../generated/graphql";
import { LocaleContext } from "../LocaleContext";

const Index = () => {
  const [locale, setLocale] = useContext(LocaleContext);
  const [{ data, fetching, error }] = useLocalesQuery();

  if (!fetching && !data) {
    return error?.response;
  }

  return (
    <Box
      bg="gray"
      h="100vh"
      w="890px"
      mx="auto"
      p="25px"
      border="5px solid black"
    >
      <Box border="5px solid black" p="70px" h="100%">
        <Heading textAlign="center">
          Alvacorre
          <br />
          <span>My Language Encyclopedia</span>
        </Heading>
        <Box bg="gray.200" w="100%" h="500px" mt="70px" mb="35px">
          {!data && fetching
            ? "loading..."
            : data?.locales.map((locale) => (
                <Button
                  onClick={() => {
                    setLocale(locale.iso);
                  }}
                >
                  {locale.iso}
                </Button>
              ))}
        </Box>
        <Flex justifyContent="space-between">
          <Text>{locale}</Text>
          <Text>by Jason Karjadi</Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Index;
