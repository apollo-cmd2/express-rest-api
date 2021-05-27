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
            role,
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
        if (user) {
          bcrypt.compare(password, user.password, async function (err, result) {
            const orders = await db.model('orders').find();
            const filteredOrders = orders.filter((order) => {
              return String(user._id) === String(order.orderedBy._id);
            });
            if (result && filteredOrders) {
              res.status(200).send({
                name: user.name,
                surname: user.surname,
                orders: filteredOrders,
                role: user.role,
                _id: user._id,
              });
            } else {
              res.status(401).send('Неправильно введены данные');
            }
          });
        } else {
          res.status(401).send('Неправильно введены данные');
        }
      });
  }

  async getUsers(__, res) {
    const query = {};
    const { role } = __.query;
    if (role) {
      query.role = role;
    }
    userModel.find(query, (err, users) => {
      if (err) {
        res.send('Что то пошло не так, повторите попытку.');
      } else {
        res.send(users);
      }
    });
  }
}

module.exports = new UserController();
