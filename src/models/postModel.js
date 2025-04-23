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
    },

    getPostsByUser: async (userId) => {
      const postsByUser = await prisma.posts.findMany({
        where: {
          user_id: userId
        },
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
      return postsByUser
    },

    deletePost: async (postId) => {
      const deletedPost = await prisma.posts.delete({
        where: {
          id: postId
        }
      })
    }
};

module.exports = {
    PostModel: PostModel
};