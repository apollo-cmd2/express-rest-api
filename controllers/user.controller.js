const userModel = require('../models/userModel');

class UserController {
  async createUser(req, res) {
    const { name, surname } = req.body;
    userModel
      .create({
        name,
        surname,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(name, surname);

    res.json('ok');
  }
}

module.exports = new UserController();
