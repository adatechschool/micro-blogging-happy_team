const { PostModel } = require("../models/postModel");
const { UserModel } = require("../models/userModel");

const PostController = {
  getHomeData: async (req, res) => {
    const userId = req.user.id;
    const connectedUser = await UserModel.getUser(userId);
    const allPosts = await PostModel.getPosts();

    const processedPosts = allPosts.map((post) => {
      const processedPost = { ...post };

      return processedPost;
    });

    res.render("home", {
      user: connectedUser,
      // parts: contentWithHashtag,
      allPosts: processedPosts,
    });
  },

  getPostById: async (req, res) => {
    const postId = req.params.id;
    const post = await PostModel.getPostById(postId);
    const userId = req.user.id;
    console.log(post);
    if (post.user_id == userId) {
      res.render("updatePost", { post: post });
    } else {
      res.send("Ce post ne vous appartient pas !");
    }
  },

  createPost: async (req, res) => {
    const { content } = req.body;
    const userId = req.user.id;

    if (!content || content.trim() === "") {
      res.status(400).send("Le contenu du post ne peut pas être vide.");
    }

    try {
      const newPost = await PostModel.createPost(content, userId);
      res.redirect("/home");
    } catch (error) {
      console.error("Erreur lors de la création du post: ", error);
      res.status(500).send("Erreur serveur lors de la création du post.");
    }
  },

  updatePost: async (req, res) => {
    const { content } = req.body;
    const postId = req.params.id;

    if (!content || content.trim() === "") {
      res.status(400).send("Le contenu du post ne peut pas être vide.");
    }

    try {
      const updatedPost = await PostModel.updatePost(postId, content);
      res.redirect("/profile");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du post: ", error);
      res.status(500).send("Erreur serveur lors de la mise à jour du post.");
    }
  },

  deletePost: async (req, res) => {
    const postId = req.params.id;
    const deletedPost = await PostModel.deletePost(postId);
    res.redirect("/profile");
  },
};

module.exports = {
  PostController: PostController,
};
