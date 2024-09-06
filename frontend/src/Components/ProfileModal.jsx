import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Input,
  Box,
  Flex,
  IconButton,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi"; 

function ProfileModal({ isOpen, onClose }) {
  // State to hold the name and selected image file
  const [name, setName] = useState("Dnyaneshwar Patil");
  const [profileImage, setProfileImage] = useState(null);

  // Handler for file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setProfileImage(URL.createObjectURL(file));
        console.log(profileImage)
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Your Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Container to position Avatar and Edit Icon */}
            <Flex justifyContent="center" mb={4} position="relative" >
              {/* Display selected image or default avatar */}
              <Avatar size="xl" src={profileImage} />

              
              <Box position="absolute" bottom={0} right={"40%"}>
                <IconButton
                  aria-label="Edit Profile Picture"
                  icon={<FiEdit />}
                  size="sm"
                  colorScheme="blue"
                  borderRadius="full"
                  as="label" 
                  htmlFor="file-input"
                  cursor="pointer"
                />
                {/* Hidden input for file selection */}
                <Input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  display="none"
                />
              </Box>
            </Flex>

            {/* Form Controls for Name and Email */}
            <Box p={4}>
              <FormControl mb={4}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  isRequired
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  value="dnyanu@gmail.com"
                  isReadOnly
                  placeholder="Email Address"
                />
              </FormControl>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="facebook">Update Profile</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileModal;
