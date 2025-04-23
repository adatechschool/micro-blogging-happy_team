const { PostModel } = require("../models/postModel");
const { UserModel } = require("../models/userModel");

const PostController = {
    getHomeData: async (req, res) => {
        const userId = req.user.id;
        const connectedUser = await UserModel.getUser(userId);
        const allPosts = await PostModel.getPosts();

        function searchHashtag(object) {
            for (let i = 0; i < object.length; i++) {
                const content = allPosts[i].content;
                console.log("content: ", [i], content);

                const regex = /#\w+/g;
                const hashtags = content.match(regex);
                console.log(hashtags);
            }
        }

        // const contentWithHashtag = searchHashtag(allPosts);

        function jesaispas(object) {
            const allPosts = object;

            allPosts.forEach((element) => console.log(element));
        }

        jesaispas(allPosts);

        res.render("home", { 
            user: connectedUser,
            AllPosts: allPosts,
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

    }
};

module.exports = {
    PostController: PostController
};