import React, { useRef } from 'react';
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
  DarkMode,
  IconButton,
} from '@chakra-ui/react';
import { RiMenu4Line } from 'react-icons/ri';

function HeaderMobile({ logo, actions, searchBar, onOpen, onClose, isOpen }) {
  const btnRef = useRef();

  return (
    <Flex
      maxW="4xl"
      width="full"
      justify="space-between"
      align="center"
      p="4"
      style={{ gap: '5rem' }}
    >
      <DarkMode>
        {logo}
        <IconButton
          ref={btnRef}
          aria-label="Search database"
          onClick={onOpen}
          icon={<RiMenu4Line />}
        />
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>
              <DrawerBody>{searchBar}</DrawerBody>
              <DrawerFooter>{actions}</DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </DarkMode>
    </Flex>
  );
}

export default HeaderMobile;
