import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DeleteTodo({ taskId, onClose, fetchTasks }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const handleDelete = async (e) => {
      setIsLoading(true);
      const token = JSON.parse(localStorage.getItem("token"))
      if (!token) {
          navigate("/")
      }
    try {
      await axios.delete(`https://full-stack-assignment-r44d.onrender.com/api/task/${taskId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      fetchTasks(token);
      toast({
        title: "Task Deleted.",
        description: "Todo Deleted Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Task Deletion Failed.",
        description: "Failed to delete the task try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>
            This action is permanent. Are you sure you want to delete this task?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="red"
            onClick={handleDelete}
            mr={3}
            isLoading={isLoading}
          >
            Delete
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteTodo;
