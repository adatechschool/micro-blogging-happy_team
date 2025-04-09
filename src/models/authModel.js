const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const AuthModel = {

    createUser: async (password) => {
        //TODO: tout transformer en variable, un json?
        const result = await prisma.users.create({
            data: {
              username: "lapin",
              pseudo: "Lauriane",
              firstname: "Lauriane",
              lastname: "pirouette",
              biography: "ancienne patineuse jeux olympiques",
              email: "lauriane.tr@gmail.com",
              password: password
            },
        });
    },

    logIn: async (email) => {
        const userInfo = await prisma.users.findUnique({
            where:{
                email : email
            },
            select:{ 
                email:true, 
                password:true
            }
        })

        return userInfo
    }
}

module.exports = {
    AuthModel
}