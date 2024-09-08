import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { HStack, Button, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../Components/Column";
import AddTodo from "../Components/AddTodo";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [tasksByStatus, setTasksByStatus] = useState({
    todo: [],
    inprogress: [],
    completed: [],
    overdue: [],
  });

  const fetchTasks = async (token) => {
    try {
      const response = await axios.get("https://full-stack-assignment-r44d.onrender.com/api/task/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const newTasksByStatus = {
        todo: [],
        inprogress: [],
        completed: [],
        overdue: [],
      };

      response.data.data.forEach((el) => {
        newTasksByStatus[el._id] = el.tasks;
      });

      setTasksByStatus(newTasksByStatus);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast({
        title: "Get tasks Failed",
        description: "Error while fetching task ! try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    const localToken = JSON.parse(localStorage.getItem("token"));

    if (urlToken) {
      if (localToken !== urlToken) {
        localStorage.setItem("token", JSON.stringify(urlToken));
      }
      fetchTasks(urlToken || localToken);
    } else if (localToken) {
      fetchTasks(localToken);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const updateTaskStatus = async (taskId, newStatus) => {
    setLoading(true);
    const token=JSON.parse(localStorage.getItem("token"));
    try {
      await axios.patch(
        `https://full-stack-assignment-r44d.onrender.com/api/task/${taskId}`,
        { status: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
    } catch (error) {
      console.error("Error updating task status:", error);
      setLoading(false);
    }
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const column = tasksByStatus[source.droppableId];
      const reorderedTasks = reorder(column, source.index, destination.index);

      setTasksByStatus((prev) => ({
        ...prev,
        [source.droppableId]: reorderedTasks,
      }));
    } else {
      const sourceColumn = tasksByStatus[source.droppableId];
      const destinationColumn = tasksByStatus[destination.droppableId];

      const [movedTask] = sourceColumn.splice(source.index, 1);
      movedTask.status = destination.droppableId;

      destinationColumn.splice(destination.index, 0, movedTask);

      setTasksByStatus((prev) => ({
        ...prev,
        [source.droppableId]: sourceColumn,
        [destination.droppableId]: destinationColumn,
      }));

      updateTaskStatus(draggableId, destination.droppableId);
    }
  };

  return (
    <>
      <Navbar />
      <DragDropContext onDragEnd={onDragEnd}>
        <HStack h="90vh" spacing={0}>
          {["todo", "inprogress", "completed", "overdue"].map((status) => {
            const bgColor =
              status === "todo"
                ? "blue.500"
                : status === "inprogress"
                ? "yellow.400"
                : status === "completed"
                ? "green.500"
                : status === "overdue"
                ? "red.500"
                : "gray.500";

            return (
              <Column
                key={status}
                columnId={status}
                columnName={status.charAt(0).toUpperCase() + status.slice(1)}
                tasks={tasksByStatus[status]}
                bgColor={bgColor}
                loading={loading}
                fetchTasks={fetchTasks}
              />
            );
          })}
        </HStack>
      </DragDropContext>

      <AddTodo fetchTasks={fetchTasks} />
    </>
  );
}

export default HomePage;
