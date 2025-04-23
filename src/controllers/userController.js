const { UserModel } = require("../models/userModel");
const { PostModel } = require("../models/postModel");

const UserController = {
    getUser: async (req, res) => {
        const userId = req.user.id;
        const connectedUser = await UserModel.getUser(userId);

        res.render("updateProfile", {
            user: connectedUser
        })
    },

    updateUser: async (req, res) => {
        const userId =  req.user.id;
        console.log(userId);

        const { username, email, biography, password } = req.body;
        const user = await UserModel.updateUser(
            userId,
            username,
            email,
            biography,
            // password
        );
        res.redirect("/profile")
    }
}

module.exports = {
    UserController
}