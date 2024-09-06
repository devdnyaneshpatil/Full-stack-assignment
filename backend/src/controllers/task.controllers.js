const taskContext = require("../db/context/task.context");
const CustomError = require("../utils/customError");
const isValidData = require("../utils/dataValidator");
const createTaskController = async (req, res, next) => {
  req.body.userId = req.userId;
  try {
    const validate = isValidData(req.body, ["title"]);
    if (validate !== true) {
      const err = new CustomError(validate, 400);
      return next(err);
    }
    const newTask = await taskContext.createNewTask(req.body);
    return res.status(201).json({ msg: "Task created successfully" });
  } catch (error) {
    const err = new CustomError(`Internal Server Error ${error.message}`, 500);
    return next(err);
  }
};

const getTaskController = async (req, res, next) => {
  try {
    const tasks = await taskContext.getTasks(req.userId);
    return res.status(200).json({ data: tasks });
  } catch (error) {
    const err = new CustomError(`Internal Server Error ${error.message}`, 500);
    return next(err);
  }
};

const updateTaskController = async (req, res, next) => {
  const taskId = req.params.id;
  try {
    const updatedTask = await taskContext.updateTask(taskId, req.body);
    return res.status(200).json({ msg: "Task Updated Successfully" });
  } catch (error) {
    const err = new CustomError(`Internal Server Error ${error.message}`, 500);
    return next(err);
  }
};

const deleteTaskController = async (req, res, next) => {
  const taskId = req.params.id;
  try {
    taskContext.deleteTask(taskId);
    return res.status(200).json({ msg: "Task Deleted Successfully" });
  } catch (error) {
    const err = new CustomError(`Internal Server Error ${error.message}`, 500);
    return next(err);
  }
};

module.exports = {
  createTaskController,
  getTaskController,
  updateTaskController,
  deleteTaskController,
};
