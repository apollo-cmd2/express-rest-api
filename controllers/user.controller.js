const userModel = require('../models/userModel');
const db = require('../db')

class UserController {
  async createUser(req, res) {
    const { name, surname } = req.body;

    console.log(req.body)
    userModel
      .create({
        name,
        surname,
      })
      .then((_res) => {
        res.json(_res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = new UserController();
