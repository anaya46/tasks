const { User } = require("../models/user.model")

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await User.create({ name, email, password, })

        res.status(201).json({
            status: "success",
            data: { newUser }
        })

    } catch (error) {
        console.log(error);

    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            where: { status: "active" }
        });
        res.status(200).json({
            status: "success",
            data: { users }
        })

    } catch (error) {
        console.log(error);

    }
}



module.exports = {
    createUser,
    getAllUsers,


};



