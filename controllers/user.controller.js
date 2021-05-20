const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const db = require('../db');

const saltRounds = 10;

class UserController {
  async createUser(req, res) {
    const { name, surname, password, username } = req.body;
    if (surname && password) {
      await bcrypt.hash(password, saltRounds).then((val) => {
        userModel
          .create({
            name,
            surname,
            password: val,
            username,
          })
          .then((_res) => {
            res.json(_res);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      res.status(400).send('Введите пароль и логин');
    }
  }

  async loginUser(req, res) {
    const { username, password } = req.body;

    await db
      .model('user')
      .findOne()
      .where({ username })
      .then((user) => {
        bcrypt.compare(password, user.password, function (err, result) {
          if (result) {
            res.status(200).send({
              name: user.name,
              surname: user.surname,
              orders: user.orders,
            });
          } else {
            res.status(401).send('Неправильно введены данные');
          }
        });
      });
  }
}

module.exports = new UserController();
