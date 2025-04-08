// import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const createUser = await prisma.users.create({
    data: {
      username: "lapin",
      pseudo: "LaurianeTheBest",
      firstname: "Lauriane",
      lastname: "pirouette",
      biography: "ancienne patineuse jeux olympiques",
      email: "lauriane.tr@gmail.com",
      password: "1234",
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
  console.log(createUser);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
