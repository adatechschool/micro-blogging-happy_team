const { HomeModel } = require("../models/homeModel")
const pug = require('pug');

const HomeController = {
//     getUser: async (req, res) => {
//         const userId = req.user.id;
//         console.log("Connecté sur l'utilisateur", userId)
//         const connectedUser = await HomeModel.getUser(userId)

//         res.render("home", {user: connectedUser})
// },
//     getAllPosts: async (req, res) => {
//         const allPosts = await HomeModel.getPosts()
//         console.log(allPosts)

//         res.render("home", { allPosts: allPosts} ) //Appel user + posts ? 
//     },

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