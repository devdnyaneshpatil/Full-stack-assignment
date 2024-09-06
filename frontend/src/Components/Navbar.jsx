import React from "react";
import {
  Box,
  Flex,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import ProfileModal from "./ProfileModal";

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box bg="blue.500" px={"4%"} py={2}>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="xl" fontWeight="bold" color="white">
          Task Manager
        </Text>
        <Menu>
          <MenuButton variant="link" cursor="pointer">
            <Avatar
              size="md"
              name="User Name"
              src="https://bit.ly/broken-link"
              cursor="pointer"
            />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onOpen}>Profile</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <ProfileModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default Navbar;
