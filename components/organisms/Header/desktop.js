import React from 'react';
import {
  Box,
  Heading,
  Flex,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useMediaQuery,
  DarkMode,
  IconButton,
  Link as CHLink,
  Text,
  Button,
} from '@chakra-ui/react';

function HeaderDesktop({ logo, actions, searchBar }) {
  return (
    <Flex
      maxW="4xl"
      width="full"
      justify="space-between"
      align="center"
      py="4"
      style={{ gap: '5rem' }}
    >
      {logo}
      {searchBar}
      {actions}
    </Flex>
  );
}

export default HeaderDesktop;
