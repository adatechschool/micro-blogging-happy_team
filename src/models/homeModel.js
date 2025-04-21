const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const HomeModel = {
    getUser: async (id) => {
        const connectedUser = await prisma.users.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                username: true,
                pseudo: true,
                biography:true
            }
        });
        return connectedUser;
    },

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
              created_at: 'desc' // Pour avoir les posts les plus récents d'abord
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
    HomeModel
};