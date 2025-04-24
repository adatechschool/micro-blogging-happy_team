const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const PostModel = {
  getPosts: async () => {
    const allPosts = await prisma.posts.findMany({
      include: {
        users: {
          select: {
            pseudo: true,
            username: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return allPosts;
  },

  createPost: async (content, userId) => {
    const newPost = await prisma.posts.create({
      data: {
        content: content,
        user_id: parseInt(userId),
      },
    });
    return newPost;
  },

  getPostsByUser: async (userId) => {
    const postsByUser = await prisma.posts.findMany({
      where: {
        user_id: userId,
      },
      include: {
        users: {
          select: {
            pseudo: true,
            username: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return postsByUser;
  },

  getPostById: async (postId) => {
    const post = await prisma.posts.findUnique({
      where: {
        id: postId,
      },
      select: {
        id: true,
        content: true,
        user_id: true,
      },
      // include: {
      //   users: {
      //     select: {
      //       pseudo: true,
      //       username: true,
      //     },
      //   },
      // },
    });
    return post;
  },

  updatePost: async (postId, contentUpdate) => {
    const updatedPost = await prisma.posts.update({
      where: {
        id: postId,
      },
      data: {
        content: contentUpdate,
      },
    });
    return updatedPost;
  },

  deletePost: async (postId) => {
    const deletedPost = await prisma.posts.delete({
      where: {
        id: postId,
      },
    });
  },
};

module.exports = {
  PostModel: PostModel,
};
