import Head from 'next/head';

import ProductList from '../components/organisms/ProductList/index';
import Header from '../components/organisms/Header/index';
import Card from '../components/molecules/Card/index';

import { getRecentProducts } from '../lib/productsAPI';
import { Box, Container } from '@chakra-ui/react';

import DefaultLayout from '../templates/default';

function Home({ data }) {
  return (
    <DefaultLayout title="Home">
      <Box
        width="100vw"
        maxW="4xl"
        height="100vh"
        maxH="sm"
        borderRadius="0.2rem"
        background="rgba(255,255,255,0.05)"
        my="6"
      ></Box>
      <ProductList products={data}>
        {data.map((d) => (
          <Card data={d} key={d.id} />
        ))}
      </ProductList>
    </DefaultLayout>
  );
}

export async function getStaticProps() {
  const data = await getRecentProducts();

  return {
    props: {
      data,
    },
  };
}

export default Home;
