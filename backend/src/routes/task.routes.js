const { createTaskController, getTaskController, updateTaskController, deleteTaskController } = require("../controllers/task.controllers")
const auth = require("../middlewares/auth.middleware")

const taskRouter = require("express").Router()

taskRouter.post("/",auth, createTaskController)
taskRouter.get("/", auth,getTaskController)
taskRouter.patch("/:id",auth, updateTaskController)
taskRouter.delete("/:id",auth,deleteTaskController)

module.exports=taskRouter