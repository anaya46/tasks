const { Task } = require("../models/task.model")
const { User } = require("../models/user.model")

const createNewTask = async (req, res) => {
    try {
        const { title, userId, startDate, limitDate } = req.body;
        const newTask = await Task.create({ title, userId, startDate, limitDate })

        res.status(201).json({
            status: "success",
            data: { newTask }
        })

    } catch (error) {
        console.log(error);

    }
}
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            include: {
                model: User,
                attributes: ["id", "name", "email", "status"],
            },
        });
        res.status(200).json({
            status: "sucess",
            data: { tasks }
        })

    } catch (error) {
        console.log(error);

    }
};

const getSomeTasks = async (req, res) => {
    try {
        const { status } = req.params;
        const statusOptions = ["active", "completed", "late", "cancelled"];
        const tasks = await Task.findAll({ where: { status } })

        if (status.includes(statusOptions))
            return res.status(404).json({
                status: "error",
                message: "Status not found",
            })

        res.status(200).json({
            status: "sucess",
            data: { tasks }
        })
    } catch (error) {
        console.log(error);

    }

}
const cancellTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({
            where: { id }
        });

        if (!task) {
            return res.status(404).json({
                status: "error",
                message: "Task not found"
            })
        }
        await task.update({ status: "cancelled" });
        res.status(200).json({
            status: "success",
            data: { task }
        });


    } catch (error) {
        console.log(error);

    }
}

const updateTask = async (req, res) => {
    try {
        const { finishDate } = req.body
        const { task } = req;
        await task.update({ finishDate })

        if (task.finishDate > task.limitDate) {
            await task.update({ status: "late" })
        } else if (task.finishDate <= task.limitDate) {
            await task.update({ status: "completed" })
        }
        res.status(200).json({
            status: "success",
            data: { task }
        });




    } catch (error) {
        console.log(error);

    }
}



module.exports = {
    createNewTask,
    getAllTasks,
    getSomeTasks,
    cancellTask,
    updateTask,
}