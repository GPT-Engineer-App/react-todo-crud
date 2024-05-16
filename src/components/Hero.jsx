import { Box, Heading, Text, Button } from "@chakra-ui/react";

const Hero = () => {
  return (
    <Box bg="teal.500" color="white" py={20} textAlign="center">
      <Heading as="h1" size="2xl" mb={4}>
        Welcome to the Todo App
      </Heading>
      <Text fontSize="xl" mb={4}>
        Manage your tasks efficiently and effectively.
      </Text>
      <Button colorScheme="teal" size="lg">
        Get Started
      </Button>
    </Box>
  );
};

export default Hero;
