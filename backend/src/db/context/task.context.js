const { Task } = require("../../models")

const createNewTask = async (payload) => {
    const task = await new Task(payload).save()
    return task
}

const getTasks = async (userId) => {
    const tasks = await Task.find({ userId })
    return tasks
}

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