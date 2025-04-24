const { PostModel } = require("../models/postModel");
const { UserModel } = require("../models/userModel");

const PostController = {
  getHomeData: async (req, res) => {
    const userId = req.user.id;
    const connectedUser = await UserModel.getUser(userId);
    const allPosts = await PostModel.getPosts();

    // function searchHashtags(posts) {
    //     for (let i = 0; i < posts.length; i++) {
    //         const content = posts[i].content;
    //         console.log("Post", i, "contenu:", content);
    //
    //         const regex = /#\w+/g;
    //         const hashtags = content.match(regex);
    //
    //         if (hashtags) {
    //             console.log("Hashtags trouvés:", hashtags);
    //         } else {
    //             console.log("Pas de hashtags dans ce post");
    //         }
    //     }
    // }

    // const contentWithHashtag = searchHashtags(allPosts);

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

    try {
      const newPost = await PostModel.createPost(content, userId);
      res.redirect("/home");
    } catch (error) {
      console.error("Erreur lors de la création du post: ", error);
    }
  },

  updatePost: async (req, res) => {
    const { content } = req.body;
    const postId = req.params.id;
    const updatedPost = await PostModel.updatePost(postId, content);
    res.redirect("/profile");
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
