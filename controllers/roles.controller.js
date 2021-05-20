const db = require('../db');
const rolesModel = require('../models/roles.model');

class RolesController {
  async addRole(req, res) {
    console.log(req.body);
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
    rolesModel.find({}, (_, values) => {
      res.json(values);
    });
  }
}

module.exports = new RolesController();
