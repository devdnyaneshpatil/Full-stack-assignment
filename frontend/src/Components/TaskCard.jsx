import React from "react";
import { Box, Text, IconButton, useDisclosure } from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";
import { MdDeleteForever } from "react-icons/md";
import DeleteTodo from "./DeleteTodo";

function TaskCard({ taskId, title, dueDate, status, index, fetchTasks }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getStatusColor = (status) => {
    switch (status) {
      case "todo":
        return "blue.100";
      case "completed":
        return "green.100";
      case "inprogress":
        return "yellow.100";
      case "overdue":
        return "red.100";
      default:
        return "gray.100";
    }
  };
  const isOverdue = () => {
    if (dueDate) {
      const today = new Date();
      const taskDueDate = new Date(dueDate);
      return taskDueDate < today && status !== "overdue";
    }
    return false;
  };

  return (
    <>
      <Draggable draggableId={taskId} index={index}>
        {(provided) => (
          <Box
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            mb={4}
            backgroundColor={getStatusColor(status)}
            boxShadow="md"
            width="100%"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            position="relative"
          >
            <IconButton
              icon={<MdDeleteForever />}
              aria-label="Delete Task"
              onClick={onOpen}
              position="absolute"
              top={2}
              right={2}
              colorScheme="red"
              zIndex="docked"
            />
            <Text fontSize="xl" fontWeight="bold">
              {title}
            </Text>
            <Text fontSize="sm" color="gray.600" mt={2}>
              Due Date:{" "}
              {dueDate ? new Date(dueDate).toLocaleDateString() : "No Due Date"}
            </Text>
            {isOverdue() && (
              <Text fontSize="sm" color="red.500" mt={2}>
                This task is overdue. Please shift it to "Overdue" or delete it.
              </Text>
            )}
          </Box>
        )}
      </Draggable>
      {isOpen && (
        <DeleteTodo taskId={taskId} onClose={onClose} fetchTasks={fetchTasks} />
      )}
    </>
  );
}

export default TaskCard;
