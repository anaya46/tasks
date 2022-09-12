const express = require("express")



const { createUserValidators } = require("../middlewares/validators.middlewares");


const usersRouter = express.Router()

const {
    createUser,
    getAllUsers,

} = require("../controllers/user.controller");


usersRouter.post("/", createUserValidators, createUser);
usersRouter.get("/", getAllUsers);


module.exports = { usersRouter }