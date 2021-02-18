import React from 'react';
import { getAllProductsId, getProductById } from '../../lib/productsAPI';

import { FiShoppingBag, FiShoppingCart } from 'react-icons/fi';
import { Box, Heading, Icon, IconButton, Text, Flex } from '@chakra-ui/react';

import DefaultLayout from '../../templates/default';

function Product({ product }) {
  return (
    <DefaultLayout title={product.name}>
      <Box
        as="section"
        p="2"
        display="flex"
        mt="3rem"
        style={{ gap: '2rem', flexWrap: 'wrap' }}
      >
        <Icon as={FiShoppingBag} fontSize="20rem" opacity="0.1" />
        <Flex direction="column" minW="sm" w="60%">
          <Box as="header">
            <Heading>{product.name}</Heading>
            <Box display="flex" alignItems="center">
              <Text fontSize="2rem" opacity="0.5">
                ${product.price}
              </Text>
              <IconButton
                aria-label="Add to Cart"
                icon={<FiShoppingCart />}
                variant="ghost"
                fontSize="1.5rem"
                _hover={{
                  background: 'rgba(255,255,255, 0.1)',
                }}
                ml="0.5rem"
              />
            </Box>
          </Box>
          <Text mt="2rem">{product.description}</Text>
        </Flex>
      </Box>
    </DefaultLayout>
  );
}

export async function getStaticPaths() {
  const productsId = await getAllProductsId();

  const paths = productsId.map((id) => `/products/${id}`);

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const product = await getProductById(params.id);

  return { props: { product } };
}

export default Product;
