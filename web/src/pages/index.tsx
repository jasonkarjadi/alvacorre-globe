import { Box, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

const Index = () => {
  const [locale, setLocale] = useState("en");

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
          {locale}
        </Box>
        <Text textAlign="right">by Jason Karjadi</Text>
      </Box>
    </Box>
  );
};

export default Index;
