const { AuthModel } = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY;

const AuthController = {
  signUp: async (req, res) => {
    const { username, pseudo, biography, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await AuthModel.createUser(
      username,
      pseudo,
      // biography,
      email,
      hashedPassword
    );
    res.redirect("/");
    // res.send("Inscription réussie");
  },

  logIn: async (req, res) => {
    const { email, password } = req.body;
    const userInfo = await AuthModel.logIn(email);
    const passwordMatch = await bcrypt.compare(password, userInfo.password);

    if (!passwordMatch) {
      res.send("Identifiants incorrects");
    }
    const token = jwt.sign({ id: Number(userInfo.id) }, jwtKey, {
      expiresIn: "3 hours",
    });
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/home");
    //res.send("Connexion réussie");
  },
};

module.exports = AuthController;
