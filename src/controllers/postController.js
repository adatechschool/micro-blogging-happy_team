const { PostModel } = require("../models/postModel");
const { UserModel } = require("../models/userModel");

const PostController = {
    getHomeData: async (req, res) => {
        const userId = req.user.id;
        const connectedUser = await UserModel.getUser(userId);
        const allPosts = await PostModel.getPosts();
        
        res.render("home", { 
        user: connectedUser,
        AllPosts: allPosts
    });
    }, 

    createPost: async (req, res) => {
        const { content } = req.body;
        const userId = req.user.id;

        try{
        const newPost = await PostModel.createPost(content, userId);
        res.redirect('/home');
        } catch(error) {
            console.error("Erreur lors de la création du post: ", error)
        }

    },

    deletePost: async (req, res) => {
        const postId = req.params.id;
        const deletedPost = await PostModel.deletePost(postId)
        res.redirect('/profile')
    }
};

module.exports = {
    PostController: PostController
};