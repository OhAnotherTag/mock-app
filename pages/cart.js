import React, { useEffect, useState } from 'react';
import { useService, useActor } from '@xstate/react';

import { useAuthService } from '../context/AuthContext';
import { getProductsFromCart } from '../lib/productsAPI';

import CartItem from '../components/molecules/CartItem/index';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

import DefaultLayout from '../templates/default';

function Cart() {
  const service = useAuthService();

  const [authState] = useService(service);
  const [cartState, cartSender] = useActor(authState.context.cartRef);
  const [items, setItems] = useState([]);

  const { cart } = cartState.context;

  useEffect(() => {
    getProductsFromCart(cart).then((data) => {
      setItems(data);
    });
  }, [cart]);

  function calcTotal() {
    if (!items) return 0;
    return items.reduce(
      (acc, currValue) => acc + currValue.price * currValue.qty,
      0
    );
  }

  return (
    <DefaultLayout>
      <Flex
        direction="row"
        style={{ gap: '2rem' }}
        mt="3rem"
        wrap="wrap-reverse"
      >
        <Box
          as="section"
          display="flex"
          flexDirection="column"
          style={{ gap: '1rem' }}
          w="full"
          p="4"
        >
          {items ? null : <Heading opacity="0.2">Empty</Heading>}
          {items.map((item) => (
            <CartItem item={item} key={item.id} />
          ))}
        </Box>
        <Box w="full" p="4" background="rgba(255,255,255,0.05)">
          <Heading as="h2" size="md">
            Total:
          </Heading>
          <Text fontSize="5xl">${calcTotal()}</Text>
        </Box>
      </Flex>
    </DefaultLayout>
  );
}

export default Cart;
