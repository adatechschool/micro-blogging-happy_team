// import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

async function signUp() {
  const hashedPassword = await bcrypt.hash("1234", 10);
  const createUser = await prisma.users.create({
    data: {
      username: "lapin",
      pseudo: "Gweny",
      firstname: "Lauriane",
      lastname: "pirouette",
      biography: "ancienne patineuse jeux olympiques",
      email: "gweny.tr@gmail.com",
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
  console.log(createUser);
}

signUp()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
