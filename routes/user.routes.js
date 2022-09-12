const express = require("express")
const { userExists } = require("../middlewares/users.middlewares.js")


const { createUserValidators } = require("../middlewares/validators.middlewares");


const usersRouter = express.Router()

const {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,

} = require("../controllers/user.controller");


usersRouter.post("/", createUserValidators, createUser);
usersRouter.get("/", getAllUsers);
usersRouter.patch("/:id", userExists, updateUser);
usersRouter.delete("/:id", userExists, deleteUser);

module.exports = { usersRouter }