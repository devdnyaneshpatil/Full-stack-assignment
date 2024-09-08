import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  //toast initialization
  const toast = useToast();

  //loading state
  const [isLoading, setIsLoading] = useState(false);

  //state and handling of show password
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [touched, setTouched] = useState({
    userName: false,
    email: false,
    password: false,
  });

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://full-stack-assignment-r44d.onrender.com/api/auth/sign-up",
        formData
      );
      toast({
        title: "Signup Successfull",
        description: "Welcome To Task Manager",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      localStorage.setItem("token", JSON.stringify(data.userObj.token));
      navigate("/home");
    } catch (error) {
      toast({
        title: "Signup Failed",
        description:
          error?.response?.data?.message || "Failed to Signup Try Again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      setTouched({
        userName: false,
        email: false,
        password: false,
      });
      setFormData({
        userName: "",
        email: "",
        password: "",
      });
    }
  };
  const isNameError = formData.userName === "" || formData.userName.length < 3;
  const isEmailError = formData.email === "" || !validateEmail(formData.email);
  const isPasswordError =
    formData.password === "" || formData.password.length < 8;

  return (
    <>
      <Box
        w="100%"
        h="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="gray.50"
      >
        <Container
          maxW="sm"
          p="6"
          borderRadius="lg"
          boxShadow="lg"
          h={{ base: "100vh", md: "auto" }}
          bg={{ base: "gray.100", md: "white" }}
        >
          <Box display="flex" justifyContent="center" mb="6">
            <Avatar
              size="xl"
              name="User Avatar"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9erFhDDh8-IrhPD1QbsEgoRmBqN3X2uhcASeucM6_cMf5jucvxkMjxcpp84G1xzY2KsA&usqp=CAU"
            />
          </Box>
          <form onSubmit={handleSubmit}>
            <FormControl isInvalid={touched.userName && isNameError}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={formData.userName}
                onChange={handleInputChange}
                name="userName"
                onBlur={handleBlur}
                borderColor={
                  touched.userName && isNameError ? "red.500" : "gray.300"
                }
              />
              {!touched.userName || !isNameError ? (
                <FormHelperText></FormHelperText>
              ) : (
                <FormErrorMessage>
                  Name is Required and valid*.
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={touched.email && isEmailError} mt={"2"}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                name="email"
                onBlur={handleBlur}
                borderColor={
                  touched.email && isEmailError ? "red.500" : "gray.300"
                }
              />
              {!touched.email || !isEmailError ? (
                <FormHelperText>
                  Enter the email you'd like to use for Register.
                </FormHelperText>
              ) : (
                <FormErrorMessage>
                  Please enter a valid email*.
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={touched.password && isPasswordError} mt="2">
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  type={show ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  name="password"
                  onBlur={handleBlur}
                  borderColor={
                    touched.password && isPasswordError ? "red.500" : "gray.300"
                  }
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {!touched.password || !isPasswordError ? (
                <FormHelperText></FormHelperText>
              ) : (
                <FormErrorMessage>
                  Password must be at least 8 characters*.
                </FormErrorMessage>
              )}
            </FormControl>
            <Button
              colorScheme="blue"
              mt="4"
              w="full"
              isDisabled={isEmailError || isPasswordError}
              type="submit"
              isLoading={isLoading}
            >
              Signup
            </Button>
          </form>
          <Text textAlign={"center"} mt={"3"}>
            Already have an account?
            <Link to="/" style={{ color: "blue", fontWeight: "bold" }}>
              Login
            </Link>
          </Text>
        </Container>
      </Box>
    </>
  );
}

export default Signup;
