const express = require("express");
const app = express();
const port = 3000;
const authController = require("./controllers/authController");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(express.json());

app.post("/signup", authController.signUp);
app.post("/login", authController.logIn);

app.listen(port, () => {
  console.log("serveur sur le port ", port);
});

process.on("SIGINT", async () => {
  console.log("Déconnexion de Prisma...");
  await prisma.$disconnect();
  process.exit(0);
});
