const { PostModel } = require("../models/postModel");
const { UserModel } = require("../models/userModel");

const ProfileController = {
    getProfileData: async (req, res) => {
        const userId = req.user.id;
        const connectedUser = await UserModel.getUser(userId);
        const postsByUser = await PostModel.getPostsByUser(userId);
        
        res.render("profile", { 
            user: connectedUser,
            personalPosts: postsByUser
        });
    }
}

module.exports = {
    ProfileController
}