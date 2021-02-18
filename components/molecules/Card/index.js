import React, { useEffect } from 'react';
import { useService, useActor } from '@xstate/react';

import { useAuthService } from '../../../context/AuthContext';

import {
  Box,
  Text,
  Heading,
  IconButton,
  Link as CHLink,
} from '@chakra-ui/react';
import { FiShoppingBag, FiShoppingCart } from 'react-icons/fi';

import Link from 'next/link';

function Card({ data }) {
  const service = useAuthService();

  const [authState] = useService(service);
  const [cartState, cartSender] = useActor(authState.context.cartRef);

  function addToCart() {
    cartSender({ type: 'ITEM.ADD', value: data.id });
  }

  return (
    <Box
      
      w="18rem"
      p="4"
      borderRadius="0.2rem"
      background="rgba(255,255,255,0.05)"
      _hover={{
        transform: 'scale(1.05)',
      }}
      style={{
        transition: 'transform 0.15s linear',
      }}
    >
      <Box
        as="header"
        fontSize="8xl"
        height="40"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <FiShoppingBag />
      </Box>
      <Box mt="8">
        <Link href={`/products/${data.id}`}>
          <CHLink>
            <Heading as="h2" size="md" title={data.name} isTruncated>
              {data.name}
            </Heading>
          </CHLink>
        </Link>
        <Text fontSize="5xl">${data.price}</Text>
      </Box>
      <Box
        as="footer"
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        <IconButton
          aria-label="Add to Cart"
          icon={<FiShoppingCart />}
          variant="ghost"
          fontSize="1.5rem"
          _hover={{
            background: 'rgba(255,255,255, 0.1)',
          }}
          onClick={addToCart}
        />
      </Box>
    </Box>
  );
}

export default Card;
