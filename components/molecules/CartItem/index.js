import React, { useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Select,
  Icon,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { FiShoppingBag, FiX } from 'react-icons/fi';
import { useActor } from '@xstate/react';

function CartItem({ item }) {
  const { name, ref, price } = item;
  const [cartItemState, cartItemSender] = useActor(ref);
  const { qty } = cartItemState.context;

  function onChange(e) {
    cartItemSender({ type: 'QTY.CHANGE', value: e.target.value });
  }

  useEffect(() => {
    console.log(item);
  }, [item]);

  return (
    <Flex
      align="center"
      borderTop="1px solid rgba(255,255,255, 0.1)"
      borderBottom="1px solid rgba(255,255,255, 0.1)"
      py="1rem"
    >
      <Icon as={FiShoppingBag} fontSize="3rem" mr="2rem" />
      <Box>
        <Heading fontSize="2xl">{name}</Heading>
        <Text fontSize="2xl" opacity="0.2">
          ${price}
        </Text>
      </Box>
      <Flex align="center" justify="center" wrap="wrap" ml="auto">
        <Select width="4rem" value={qty} onChange={onChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Select>
        <IconButton
          aria-label="Delete from cart"
          icon={<FiX />}
          variant="ghost"
          fontSize="1.5rem"
          _hover={{
            background: 'rgba(255,255,255, 0.1)',
          }}
          onClick={() => cartItemSender({ type: 'REMOVE' })}
          mx="0.5rem"
        />
      </Flex>
    </Flex>
  );
}

export default CartItem;
