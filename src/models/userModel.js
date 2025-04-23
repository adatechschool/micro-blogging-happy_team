const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const UserModel = {
    getUser: async (id) => {
        const connectedUser = await prisma.users.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                username: true,
                pseudo: true,
                email: true,
                biography:true,
                password: true
            }
        });
        return connectedUser;
    },

    updateUser: async (id, username, email, biography, password) => {
        const updateUserById = await prisma.users.update({
            where: {
                id: parseInt(id)
            },
            data: {
                username: username,
                email: email,
                biography: biography,
                // password: true
            }
        });
        return updateUserById
    }
}

module.exports = {
    UserModel
}