<<<<<<< HEAD
const userModel = require("../models/userModel");
const ratingModel = require("../models/rating.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { validateEmail } = require("../utils");
const transporter = require("../mailer");
const db = require("../db");
=======
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { validateEmail } = require('../utils');
const transporter = require('../mailer');
const db = require('../db');
>>>>>>> 345a63e0279d4e1c99adedf6e626236d5e9b355e

const saltRounds = 10;

class UserController {
  async createUser(req, res) {
    const { name, surname, password, username, role } = req.body;
<<<<<<< HEAD
    const user = await db.model("user").findOne().where({ username });
=======
    const user = await db.model('user').findOne().where({ username });
>>>>>>> 345a63e0279d4e1c99adedf6e626236d5e9b355e
    if (validateEmail(username) && password && role && !user) {
      await bcrypt.hash(password, saltRounds).then((val) => {
        userModel
          .create({
            name,
            surname,
            password: val,
            username,
            role,
<<<<<<< HEAD
            emailToken: crypto.randomBytes(16).toString("hex"),
=======
            emailToken: crypto.randomBytes(16).toString('hex'),
>>>>>>> 345a63e0279d4e1c99adedf6e626236d5e9b355e
            isVerified: false,
          })
          .then(async (_res) => {
            const msg = {
              from: '"UzWorkShop" <noreply@uzworkshop.uz>',
              to: username,
<<<<<<< HEAD
              subject: "Активация аккаунта",
=======
              subject: 'Активация аккаунта',
>>>>>>> 345a63e0279d4e1c99adedf6e626236d5e9b355e
              html: `
              <span>Для активации аккаунта перейдите по</span>
              <a href=${`https://salty-bayou-72693.herokuapp.com/activation/${_res.emailToken}`}>ссылке.</a>
              `,
            };

            await transporter.sendMail(msg);

            return res.json({
              name,
              surname,
              username,
              role,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      if (!role) {
<<<<<<< HEAD
        return res.status(400).send("Выберите роль.");
      } else if (!surname || !password) {
        return res.status(400).send("Введите пароль и почту.");
      } else if (user) {
        return res.status(400).send("Пользователь с такой почтой существует.");
      } else if (!validateEmail(username)) {
        return res
          .status(400)
          .send("Введите корректный адрес электронной почты.");
=======
        return res.status(400).send('Выберите роль.');
      } else if (!surname || !password) {
        return res.status(400).send('Введите пароль и почту.');
      } else if (user) {
        return res.status(400).send('Пользователь с такой почтой существует.');
      } else if (!validateEmail(username)) {
        return res
          .status(400)
          .send('Введите корректный адрес электронной почты.');
>>>>>>> 345a63e0279d4e1c99adedf6e626236d5e9b355e
      }
    }
  }

  async loginUser(req, res) {
    const { username, password } = req.body;

    await db
<<<<<<< HEAD
      .model("user")
      .findOne()
      .where({ username })
      .then(async (user) => {
        if (user) {
          if (!user.isVerified) {
            return res.status(401).send("Для входа нужно активировать почту.");
          }
          bcrypt.compare(password, user.password, async function (err, result) {
            const orders = await db.model("orders").find();
=======
      .model('user')
      .findOne()
      .where({ username })
      .then((user) => {
        if (user) {
          if (!user.isVerified) {
            return res.status(401).send('Для входа нужно активировать почту.');
          }
          bcrypt.compare(password, user.password, async function (err, result) {
            const orders = await db.model('orders').find();
>>>>>>> 345a63e0279d4e1c99adedf6e626236d5e9b355e
            const filteredOrders = orders.filter((order) => {
              return String(user._id) === String(order.orderedBy._id);
            });
            if (result && filteredOrders) {
              return res.status(200).send({
                name: user.name,
                surname: user.surname,
                orders: filteredOrders,
                role: user.role,
                _id: user._id,
              });
            } else {
              return res.status(401).send("Неправильно введены данные");
            }
          });
        } else {
          return res.status(401).send("Неправильно введены данные");
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
<<<<<<< HEAD
        res.send("Что то пошло не так, повторите попытку.");
=======
        res.send('Что то пошло не так, повторите попытку.');
>>>>>>> 345a63e0279d4e1c99adedf6e626236d5e9b355e
      } else {
        res.send(users);
      }
    });
  }

  async deleteUser(req, res) {
    const { userId } = req.params;

    const deleted = await userModel.findByIdAndDelete(userId, {
<<<<<<< HEAD
      useFindAndModify: true,
    });

    if (deleted) {
      return res.send("Пользователь успешно удалён.");
    } else {
      return res.send("Ошибка при удалнии, повторите попытку.");
    }
  }

  async rateUser(req, res) {
    const { userId } = req.params;
    const { rate, description } = req.body;

    if (!rate) {
      return res.status(400).send("Оценка обязательна!!!");
    }

    const rating = await ratingModel.create({
      user: userId,
      rate: Number(rate),
      description,
    });
    const ratings = await ratingModel.aggregate([
      { $group: { _id: userId, average: { $avg: "$rate" } } },
    ]);

    await db.model("user").findOneAndUpdate(
      {
        _id: userId,
      },
      {
        rating: ratings.length ? Number(ratings[0].average || 0).toFixed(1) : null,
      }
    ).exec();

    if (rating && ratings) {
      return res.status(200).send("Успех!!!");
    } else {
      return res
        .status(400)
        .send("Не удалось оставить отзыв, попробуйте ещё раз.");
=======
      useFindAndModify: true
    });

    if (deleted) {
      return res.send('Пользователь успешно удалён.');
    } else {
      return res.send('Ошибка при удалнии, повторите попытку.');
>>>>>>> 345a63e0279d4e1c99adedf6e626236d5e9b355e
    }
  }
}

module.exports = new UserController();
