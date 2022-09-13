const { Task } = require("../models/task.model")

const taskExists = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({ where: [{ id }, { status: "active" }] });
        if (!task) {
            return res.status(404).json({
                status: "error",
                message: "Task not found or does not active"
            })
        }
        req.task = task,
            next();
    } catch (error) {
        console.log(error);

    }
};
module.exports = { taskExists }