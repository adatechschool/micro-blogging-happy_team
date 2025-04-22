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
                biography:true
            }
        });
        return connectedUser;
    },
}

module.exports = {
    UserModel
}