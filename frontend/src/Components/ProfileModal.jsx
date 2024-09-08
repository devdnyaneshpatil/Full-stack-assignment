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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function ProfileModal({ isOpen, onClose }) {
  const toast = useToast();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    profileImage: "",
    _id: "",
  });

  const [previewImage, setPreviewImage] = useState("");

  // Handle input changes for both text and file inputs
  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      if (file) {
        setUserData({ ...userData, profileImage: file });
        const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl);
      }
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  // Fetch user details from API
  const fetchUserDetails = async (token) => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:8080/api/user/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      setUserData({
        userName: data.data.userName || "",
        email: data.data.email || "",
        profileImage: data.data.profileImage || "",
        _id: data.data._id || "",
      });
    } catch (error) {
      setLoading(false);
      console.error(
        "Error fetching user details:",
        error.response?.data || error.message
      );
    }
  };

  // Handle form submission to update user details
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));

    const formData = new FormData();
    formData.append("userName", userData.userName);
    if (userData.profileImage) {
      formData.append("profileImage", userData.profileImage);
    }

    try {
      const { data } = await axios.patch(
        "http://localhost:8080/api/user/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      setUserData({
        userName: data.data.userName || "",
        email: data.data.email || "",
        profileImage: data.data.profileImage || "",
        _id: data.data._id || "",
      });
      toast({
        title: "Update Profile",
        description: "Profile Updated Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      setLoading(false);
      console.error(
        "Error updating user details:",
        error.response?.data || error.message
      );
      toast({
        title: "Updated faile",
        description: "Error while updating profile try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }
  };

  const getProfileImageSrc = () => {
    if (previewImage) {
      return previewImage;
    }

    if (userData.profileImage) {
      const isUrl = /^(https?:\/\/)/.test(userData.profileImage);
      return isUrl
        ? userData.profileImage
        : `http://localhost:8080/images/${userData.profileImage}`;
    }

    return "./profile.jfif";
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      fetchUserDetails(token);
    } else {
      console.error("No token found in localStorage.");
    }
  }, [navigate]);

  useEffect(() => {
    if (!isOpen) {
      setPreviewImage("");
    }
  }, [isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Your Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Form to update user details */}
            <form onSubmit={handleSubmit}>
              <Flex justifyContent="center" mb={4} position="relative">
                <Avatar size="xl" src={getProfileImageSrc()} alt="Profile" />
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
                  <Input
                    id="file-input"
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    display="none"
                    onChange={handleChange}
                  />
                </Box>
              </Flex>

              <Box p={4}>
                <FormControl mb={4}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    id="name"
                    value={userData.userName}
                    onChange={handleChange}
                    name="userName"
                  />
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    value={userData.email}
                    isReadOnly
                    placeholder="Email Address"
                  />
                </FormControl>
              </Box>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button
                  type="submit"
                  isLoading={loading}
                  colorScheme="facebook"
                >
                  Update Profile
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileModal;
