const {AuthModel} = require("../models/authModel");
const bcrypt = require("bcrypt");


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
        } else {
            console.log("Identification réussie!")
        }
  }
}

//AuthController.signUp();
AuthController.logIn()

module.exports = AuthController;