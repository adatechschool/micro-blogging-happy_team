const {AuthModel} = require("../models/authModel");

const AuthController = {
  signUp: async (req, res) => {
    const user = await AuthModel.createUser();
    console.log(user);
  },
}

AuthController.signUp();

module.exports = AuthController;