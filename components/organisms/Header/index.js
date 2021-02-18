import React, { useState, useRef } from 'react';
import { useService, useActor } from '@xstate/react';
import { useAuthService } from '../../../context/AuthContext';

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

import DesktopHeader from './desktop';
import MobileHeader from './mobile';

import SearchBar from '../../molecules/SearchBar/index';
import Link from 'next/link';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop] = useMediaQuery('(min-width: 800px)');

  const service = useAuthService();

  const [authState, authSender] = useService(service);
  const [cartState, cartSender] = useActor(authState.context.cartRef);
  const { cart } = cartState.context;

  const { user } = authState.context;

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <Box
      as="header"
      width="full"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {isDesktop ? (
        <DesktopHeader
          logo={<Logo />}
          actions={
            <Actions
              user={user}
              signOutAction={() => authSender('SIGNOUT')}
              cart={cart}
            />
          }
          searchBar={<SearchBar />}
        />
      ) : (
        <MobileHeader
          logo={<Logo />}
          actions={
            <Actions
              user={user}
              signOutAction={() => authSender('SIGNOUT')}
              cart={cart}
            />
          }
          searchBar={<SearchBar />}
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
        />
      )}
    </Box>
  );
}

function Logo() {
  return (
    <Link href="/">
      <CHLink>
        <Heading as="h2" size="xl">
          LOGO
        </Heading>
      </CHLink>
    </Link>
  );
}

function Actions({ user, signOutAction, cart }) {
  return (
    <Flex align="center" style={{ gap: '1rem' }}>
      {user ? (
        <Button
          variant="ghost"
          colorScheme="whiteAlpha"
          onClick={signOutAction}
          color="white"
        >
          SIGN OUT
        </Button>
      ) : (
        <CHLink as={Link} href="/signin">
          SIGN IN
        </CHLink>
      )}
      <CHLink as={Link} href="/cart">
        {`CART ${cart.length ? cart.length : 0}`}
      </CHLink>
    </Flex>
  );
}

export default Header;
