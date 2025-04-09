const {AuthModel} = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY

const AuthController = {
  signUp: async (req, res) => {
    const hashedPassword = await bcrypt.hash("1234", 10);
    const user = await AuthModel.createUser(hashedPassword);
    console.log(user);
  },

  logIn: async (req, res) => {
    const email = "laura.tr@gmail.com"
    const password = "1234"
    const userInfo = await AuthModel.logIn(email);

    const passwordMatch = await bcrypt.compare(password, userInfo.password);
        if (!passwordMatch) {
            return "Identifiants incorrects"
        } 
        const token = jwt.sign({id:Number(userInfo.id)}, jwtKey, {expiresIn: "3 hours"})
        console.log(token)
  }
}

//AuthController.signUp();
AuthController.logIn()

module.exports = AuthController;