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
    };

    new ordersModel(order).save().then(async (val) => {
      console.log(val, 'val');
      user.orders.push(val);
      await user.save();
      res.send(order);
    });

    // db.model('user').updateOne(
    //   {_id: userId},
    //   {$push: { orders:  }  }
    // )
  }
}

module.exports = new OrdersController();
