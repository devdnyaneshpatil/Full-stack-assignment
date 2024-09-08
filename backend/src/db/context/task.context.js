const { Task } = require("../../models")
const mongoose=require("mongoose")

const createNewTask = async (payload) => {
    const task = await new Task(payload).save()
    return task
}

const getTasks = async (userId) => {
  const tasks = await Task.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } }, // Match tasks based on userId
    {
      $group: {
        _id: "$status", // Group by 'status'
        tasks: { $push: "$$ROOT" }, // Push the entire document into the 'tasks' array
      },
    },
    { $sort: { _id: 1 } } // Optional: Sort by status (you can adjust this based on your needs)
  ]);
  return tasks;
};


const updateTask = async (taskId,payload) => {
    const updatedTask = await Task.findByIdAndUpdate(taskId, payload, {
        new:true
    })
    return updatedTask
}

const deleteTask = async (taskId) => {
    await Task.findByIdAndDelete(taskId)
}

module.exports={createNewTask,getTasks,updateTask,deleteTask}