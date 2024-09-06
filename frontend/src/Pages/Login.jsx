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
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import axios from "axios";

function Login() {
  //toast initialization
  const toast = useToast();

  //loading state
  const [isLoading, setIsLoading] = useState(false);

  //state and handling of show password
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [touched, setTouched] = useState({
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
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        formData
      );
      toast({
        title: "Login Successfull",
        description: "Welcome To Task Manager",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Login Failed",
        description:
          error?.response?.data?.message || "Failed to login Try Again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      setFormData({
        email: "",
        password: "",
      });
    }
  };
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
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEltzX7n3ZelAoJe4mlsBpziUHSG1ko6URJGibMQKr6pJEmN3M_5iixXoLIy_uCgjgPSA&usqp=CAU"
            />
          </Box>
          <Heading textAlign="center" mb="6" fontSize="2xl">
            Login
          </Heading>

          <form onSubmit={handleSubmit}>
            <FormControl isInvalid={touched.email && isEmailError}>
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
                  Enter the email you'd like to use for login.
                </FormHelperText>
              ) : (
                <FormErrorMessage>
                  Please enter a valid email*.
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={touched.password && isPasswordError} mt="4">
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
              mt="6"
              w="full"
              isDisabled={isEmailError || isPasswordError}
              type="submit"
              isLoading={isLoading}
            >
              Login
            </Button>
          </form>
          <Text textAlign={"center"} mt={"3"}>
            Don't have an account?
            <Link to="/sign-up" style={{ color: "blue", fontWeight: "bold" }}>
              Signup
            </Link>
          </Text>
          <Button w="full" mt={4} colorScheme="red" variant="outline" gap={"2"}>
            Continue with
            <FcGoogle size={"30"} />
          </Button>
        </Container>
      </Box>
    </>
  );
}

export default Login;
