const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const PostModel = {
    getPosts: async () => {
        const allPosts = await prisma.posts.findMany({
            include: {
              users: {
                select: {
                  pseudo: true,
                  username: true
                }
              }
            },
            orderBy: {
              created_at: 'desc'
            }
          })
        return allPosts
    },

    createPost: async (content, userId) => {
      const newPost = await prisma.posts.create({
        data:{
          content: content,
          user_id: parseInt(userId)
        }
      });
      return newPost;
    }
};

module.exports = {
    PostModel: PostModel
};