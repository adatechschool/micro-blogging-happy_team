const { HomeModel } = require("../models/homeModel")
const pug = require('pug');

const HomeController = {
    getHomeData: async (req, res) => {
        const userId = req.user.id;
        const connectedUser = await HomeModel.getUser(userId);
        const allPosts = await HomeModel.getPosts();
        
        res.render("home", { 
        user: connectedUser,
        AllPosts: allPosts
    });
    }, 

    createPost: async (req, res) => {
        const { content } = req.body;
        const userId = req.user.id;

        try{
        const newPost = await HomeModel.createPost(content, userId);
        res.redirect('/home');
        } catch(error) {
            console.error("Erreur lors de la création du post: ", error)
        }

    }
};

module.exports = {
    HomeController
};