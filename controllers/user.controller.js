const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const db = require('../db');

const saltRounds = 10;

class UserController {
  async createUser(req, res) {
    const { name, surname, password, username, role } = req.body;
    const user = await db.model('user').findOne().where({ username });
    if (surname && password && role && !user) {
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
      if (!role) {
        res.status(400).send('Выберите роль.');
      } else if (!surname || !password) {
        res.status(400).send('Введите пароль и логин.');
      } else if (user) {
        res.status(400).send('Пользователь с таким логином существует.');
      }
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
              role: user.role,
              _id: user._id,
            });
          } else {
            res.status(401).send('Неправильно введены данные');
          }
        });
      });
  }
}

module.exports = new UserController();
