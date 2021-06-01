const db = require('../db');
const ordersModel = require('../models/orders.model');

class OrdersController {
  async createOrder(req, res) {
    const { userId } = req.params;
    const { description } = req.body;

    const user = await db.model('user').findOne({ _id: userId });

    const order = {
      orderedBy: {
        name: user.name + ' ' + user.surname,
        _id: userId,
      },
      description,
      takenBy: null,
      takenAt: null,
      status: 'created',
    };

    new ordersModel(order).save().then(async (val) => {
      user.orders.push(val);
      await user.save();
      res.send(order);
    });

    // db.model('user').updateOne(
    //   {_id: userId},
    //   {$push: { orders:  }  }
    // )
  }

  async getOrders(req, res) {
    const query = {};
    const { status } = req.query;
    if (status) {
      query.status = status;
    }
    ordersModel.find(query, (err, values) => {
      res.send(values);
    });
  }

  async getOrder(req, res) {
    const { orderId } = req.params;

    ordersModel.findOne({ _id: orderId }, (err, order) => {
      if (order) {
        res.send(order);
      } else {
        res.send('Заявка не найдена.');
      }
    });
  }

  async updateOrder(req, res) {
    const { workerId } = req.params;
    const { orderId, status } = req.body;
    if (workerId && orderId) {
      ordersModel.findById(orderId, async (err, order) => {
        if (order) {
          if (order.status === 'created' || order.status === 'in progress') {
            db.model('user').findOne({ _id: workerId }, async (err, user) => {
              if (err) {
                res
                  .status(403)
                  .send('Что то пошло не так, попробуйте ещё раз.');
              }
              order.takenBy = {
                name: user.name + ' ' + user.surname,
                _id: user._id,
              };
              order.status = status;
              order.takenAt = new Date();
              const orderExists = user.orders.find(
                (_order) => _order._id === order._id
              );
              if (!orderExists) {
                user.orders.push(order);
                await order.save();
                await user.save();
                res.send('Успех!!!');
              } else {
                res.send(
                  'Вы уже обработали эту заявку или она в процессе обработки.'
                );
              }
            });
          } else {
            res.send(
              'Эта заявка уже в процессе выполнения или уже обработана.'
            );
          }
        } else {
          res.send('Не удалось найти заявку.');
        }
      });
    } else {
      res.status(403).send('Что то пошло не так, попробуйте ещё раз.');
    }
  }
}

module.exports = new OrdersController();
