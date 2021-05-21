const db = require('../db');
const rolesModel = require('../models/roles.model');

class RolesController {
  async addRole(req, res) {
    await rolesModel
      .insertMany(req.body)
      .then((_res) => {
        res.json(_res);
      })
      .catch((err) => {
        res.json(err);
      });
  }

  async getRoles(__, res) {
    if (res) {
      rolesModel.find({}, (_, values) => {
        res.json(values);
      });
    } else {
      res.send('Что-то пошло не так повторите попытку.');
    }
  }
}

module.exports = new RolesController();
