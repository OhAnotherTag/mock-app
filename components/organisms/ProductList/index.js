import React from 'react';
import { Box, Container, Heading, SimpleGrid } from '@chakra-ui/react';

function ProductList({ children }) {
  return (
    <>
      <Heading as="h2" size="lg">
        New Products
      </Heading>
      <SimpleGrid
        minChildWidth="250px"
        spacing="2rem"
        width="full"
        maxW="4xl"
        my="1rem"
        placeItems="center"
      >
        {children}
      </SimpleGrid>
    </>
  );
}

export default ProductList;
