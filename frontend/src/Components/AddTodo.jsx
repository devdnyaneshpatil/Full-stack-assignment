import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { MdAddComment } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddTodo({ fetchTasks }) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [todoData, setTodoData] = useState({
    title: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    setTodoData({ ...todoData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      navigate("/");
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/task/",
        todoData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);
      toast({
        title: "Task created.",
        description: "Todo Added Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTodoData({
        title: "",
        dueDate: "",
      });
      onClose();
      fetchTasks(token);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Task Creation Failed",
        description: "Error while adding task ! try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setTodoData({
        title: "",
        dueDate: "",
      });
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        position="fixed"
        bottom="10%"
        right="5%"
        colorScheme="teal"
        borderRadius="full"
        boxSize="80px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <MdAddComment size={"100"} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Todo</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl mb="4">
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  value={todoData.title}
                  name="title"
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Due Date</FormLabel>
                <Input
                  type="date"
                  value={todoData.dueDate}
                  name="dueDate"
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <Button type="submit" colorScheme="teal" isLoading={isLoading}>
                Add Todo
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddTodo;
