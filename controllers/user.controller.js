const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { validateEmail } = require("../utils");
const transporter = require("../mailer");
const db = require("../db");

const saltRounds = 10;

class UserController {
  async createUser(req, res) {
    const { name, surname, password, username, role } = req.body;
    const user = await db.model("user").findOne().where({ username });
    if (validateEmail(username) && password && role && !user) {
      await bcrypt.hash(password, saltRounds).then((val) => {
        userModel
          .create({
            name,
            surname,
            password: val,
            username,
            role,
            emailToken: crypto.randomBytes(16).toString("hex"),
            isVerified: false,
          })
          .then(async (_res) => {
            const msg = {
              from: '"UzWorkShop" <noreply@uzworkshop.uz>',
              to: username,
              subject: "Активация аккаунта",
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
        return res.status(400).send("Выберите роль.");
      } else if (!surname || !password) {
        return res.status(400).send("Введите пароль и почту.");
      } else if (user) {
        return res.status(400).send("Пользователь с такой почтой существует.");
      } else if (!validateEmail(username)) {
        return res
          .status(400)
          .send("Введите корректный адрес электронной почты.");
      }
    }
  }

  async loginUser(req, res) {
    const { username, password } = req.body;

    await db
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
                createdAt: user.created_At,
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
        res.send("Что то пошло не так, повторите попытку.");
      } else {
        res.send(users);
      }
    });
  }

  async deleteUser(req, res) {
    const { userId } = req.params;

    const deleted = await userModel.findByIdAndDelete(userId, {
      useFindAndModify: true,
    });

    if (deleted) {
      return res.send("Пользователь успешно удалён.");
    } else {
      return res.send("Ошибка при удалении, повторите попытку.");
    }
  }

  async rateUser(req, res) {
    const { orderId } = req.params;
    const { rate, description, userId } = req.body;
    const user = await userModel.findOne({ _id: userId }).exec();
    const userRole = user.role;
    const order = await db
      .model("orders")
      .findOne({ _id: orderId, status: "done" })
      .exec();
    const rating = {
      rate: Number(rate),
      description,
    };

    if (!order || !user) {
      return res.status(400).send("Не удалось оставить отзыв");
    }
    if (!rate) {
      return res.status(400).send("Оценка обязательна!!!");
    }

    if (userRole === "client" && order) {
      order.clientComment = rating;
      await order.save();
      const workerRating = await db.model("orders").aggregate([
        {
          $match: {
            _id: {
              $in: user.orders.map((_order) =>
                mongoose.Types.ObjectId(_order._id)
              ),
            },
          },
        },
        {
          $group: { _id: null, average: { $avg: "$clientComment.rate" } },
        },
      ]);
      user.rating = workerRating.length
        ? Number(workerRating[0].average || 0).toFixed(1)
        : null;
      await user.save();
    } else {
      order.workerComment = rating;
      await order.save();
      const clientRating = await db.model("orders").aggregate([
        {
          $match: {
            _id: {
              $in: user.orders.map((_order) =>
                mongoose.Types.ObjectId(_order._id)
              ),
            },
          },
        },
        {
          $group: { _id: null, average: { $avg: "$workerComment.rate" } },
        },
      ]);
      user.rating = clientRating.length
        ? Number(clientRating[0].average || 0).toFixed(1)
        : null;
      await user.save();
    }

    return res.status(200).send(rating);
  }

  async getUserComments(req, res) {
    const { userId } = req.params;
    const user = await userModel.findOne({ _id: userId }).exec();
    let comments = [];

    if (user) {
      if (user.role === "worker") {
        comments = user.orders
          .filter((order) => {
            if (order.clientComment) {
              return true;
            }
            return false;
          })
          .map((order) => order.clientComment);
        if (comments.length) {
          return res.status(200).send(comments);
        } else {
          return res.send("У вас нет отзывов.");
        }
      }
      if (user.role === "client") {
        comments = user.orders
          .filter((order) => {
            if (order.workerComment) {
              return true;
            }
            return false;
          })
          .map((order) => order.workerComment);
        if (comments.length) {
          return res.status(200).send(comments);
        } else {
          return res.send("У вас нет отзывов.");
        }
      }
      return res.send(`У вас(${user.role}) не может быть отзывов!!!`);
    } else {
      return res.send("Пользователь не найден.");
    }
  }

  async getAllComments(_, res) {
    const comments = await db
      .model("orders")
      .find({ clientComment: { $exists: true } }, "clientComment")
      .exec();

    if (comments.length) {
      return res.status(200).send(comments);
    } else {
      return res.send("Отзывов нет");
    }
  }
}

module.exports = new UserController();
