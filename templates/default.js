import React from 'react';
import Head from 'next/head';
import Header from '../components/organisms/Header/index';
import { Box, Container } from '@chakra-ui/react';

function DefaultLayout({ children, title }) {
  return (
    <>
      <Head>
        <title>Mock Store: {title}</title>
      </Head>
      <Header />
      <Box as="main" width="full" display="flex" justifyContent="center">
        <Box w="full" maxW="4xl">
          {children}
        </Box>
      </Box>
    </>
  );
}

export default DefaultLayout;
