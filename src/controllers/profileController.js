const { PostModel } = require("../models/postModel");
const { UserModel } = require("../models/userModel");

const ProfileController = {
    getProfileData: async (req, res) => {
        const userId = req.user.id;
        const connectedUser = await UserModel.getUser(userId);
        const postsByUser = await PostModel.getPostsByUser(userId);

        const processedPersonalPosts = postsByUser.map((post) => {
            const processedPersonalPost = { ...post};
            return processedPersonalPost
        });
        
        res.render("profile", { 
            user: connectedUser,
            personalPosts: processedPersonalPosts,
        });
    }
}

module.exports = {
    ProfileController
}