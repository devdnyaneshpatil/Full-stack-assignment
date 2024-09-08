import React from "react";
import { VStack, Box, Text, Skeleton } from "@chakra-ui/react";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

function Column({ columnId, columnName, tasks, bgColor, loading, fetchTasks }) {
  return (
    <VStack flex="1" h="full" p={4} alignItems="flex-start" spacing={4}>
      <Box
        bg={bgColor}
        w="full"
        p={3}
        borderRadius="md"
        color={columnId === "inprogress" ? "black" : "white"}
        textAlign="center"
      >
        <Text fontWeight="bold" fontSize="lg">
          {columnName}
        </Text>
      </Box>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <VStack
            overflowY="scroll"
            w="full"
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
            }}
          >
            {loading ? (
              <>
                <Skeleton height="80px" width="100%" borderRadius="lg" />
                <Skeleton height="80px" width="100%" borderRadius="lg" />
                <Skeleton height="80px" width="100%" borderRadius="lg" />
              </>
            ) : tasks.length === 0 ? (
              <Box
                bg="gray.200"
                w="full"
                p={4}
                textAlign="center"
                borderRadius="md"
              >
                No tasks available
              </Box>
            ) : (
              tasks.map((task, index) => (
                <TaskCard
                  key={task._id}
                  taskId={task._id}
                  title={task.title}
                  status={task.status}
                  dueDate={task.dueDate}
                  index={index}
                  fetchTasks={fetchTasks}
                />
              ))
            )}
            {provided.placeholder}
          </VStack>
        )}
      </Droppable>
    </VStack>
  );
}

export default Column;
