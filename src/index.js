const express = require("express");
const authController = require("./controllers/authController");
const { PostController } = require("./controllers/postController");
const { UserController } = require("./controllers/userController");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');


const app = express();
const port = 3000;
const jwtKey = process.env.JWT_KEY;

const prisma = new PrismaClient();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

verifyToken = (req, res, next) => {
  const token = req.cookies.token; 
  
  if (!token) return res.status(401).json({ message: 'Access Denied' });
  
  try {
    const verified = jwt.verify(token, jwtKey);
    req.user = verified;
    next();
  } catch (err) {
    console.error("Erreur de vérification du token:", err);
    res.status(400).json({ message: 'Invalid Token' });
  }
};

app.post("/signup", authController.signUp);
app.post("/login", authController.logIn);

app.get("/", (req, res) => {
  res.render("connection", { title: "Hey", message: "Hello there!" });
});

app.get("/home", verifyToken, PostController.getHomeData);
app.post("/add-post", verifyToken, PostController.createPost);

app.get("/update-profile", verifyToken, UserController.getUser);
app.post("/update-user", verifyToken, UserController.updateUser);

app.listen(port, () => {
  console.log("serveur sur le port ", port);
});

process.on("SIGINT", async () => {
  console.log("Déconnexion de Prisma...");
  await prisma.$disconnect();
  process.exit(0);
});
