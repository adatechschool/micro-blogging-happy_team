const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const AuthModel = {

    createUser: async () => {
        const hashedPassword = await bcrypt.hash("1234", 10);

        const result = await prisma.users.create({
            data: {
              username: "lapin",
              pseudo: "Laura",
              firstname: "Lauriane",
              lastname: "pirouette",
              biography: "ancienne patineuse jeux olympiques",
              email: "laura.tr@gmail.com",
              password: hashedPassword,
              created_at: new Date(),
              updated_at: new Date(),
            },
        });
    },
}

module.exports = {
    AuthModel
}