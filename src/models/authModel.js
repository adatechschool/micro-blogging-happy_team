const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const AuthModel = {
  createUser: async (password) => {
    //TODO: tout transformer en variable, un json?
    const result = await prisma.users.create({
      data: {
        username: "castor",
        pseudo: "Rose",
        firstname: "Nono",
        lastname: "pirouette",
        biography: "ancien champion jeux olympiques",
        email: "rose.tr@gmail.com",
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
