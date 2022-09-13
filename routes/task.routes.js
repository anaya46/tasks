const express = require("express")

const tasksRouter = express.Router()

const {
    createNewTask,
    getAllTasks,
    getSomeTasks,
    cancellTask,
    updateTask,

} = require("../controllers/task.controller")
const { taskExists } = require("../middlewares/tasks.middleware")

tasksRouter.post("/", createNewTask)
tasksRouter.get("/", getAllTasks)
tasksRouter.get("/:status", getSomeTasks)
tasksRouter.delete("/:id", cancellTask)
tasksRouter.patch("/:id", taskExists, updateTask)

module.exports = { tasksRouter }