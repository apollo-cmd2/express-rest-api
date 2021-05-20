const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const db = require('../db');

const saltRounds = 10;

class UserController {
  async createUser(req, res) {
    const { name, surname, password, username } = req.body;
    const hash = await bcrypt.hash(password, saltRounds).then((val) => {
      userModel
        .create({
          name,
          surname,
          password: hash,
          username,
        })
        .then((_res) => {
          res.json(_res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}

module.exports = new UserController();
