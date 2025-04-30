const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const AuthModel = {
  createUser: async (username, pseudo, email, password) => {
    //TODO: tout transformer en variable, un json?
    const result = await prisma.users.create({
      data: {
        username: username,
        pseudo: pseudo,
        // biography: biography,
        email: email,
        password: password,
      },
    });
  },

  logIn: async (email) => {
    const userInfo = await prisma.users.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    return userInfo;
  },
};

module.exports = {
  AuthModel,
};
