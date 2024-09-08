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
  useToast,
} from "@chakra-ui/react";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast({
      title: "Logged out",
      description: "Logged out Successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/");
  };
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
              // src="https://bit.ly/broken-link"
              cursor="pointer"
            />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onOpen}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <ProfileModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default Navbar;
