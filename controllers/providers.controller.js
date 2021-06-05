const ProvidersModel = require("../models/providers.model");

class ProvidersController {
  async createProvider(req, res) {
    try {
      const { name, phone, address, email, description } = req.body;

      if (!name) {
        return res.status(400).send({ msg: "Поле название обязательно!" });
      }

      const provider = await ProvidersModel.findOne({ name }).exec();
      if (provider) {
        return res
          .status(400)
          .send({ msg: "Поставщик с таким именем уже существует." });
      }

      await ProvidersModel.create({
        name,
        phone,
        address,
        email,
        description,
      });

      return res.status(200).send({ mesg: "Поствщик успешно добавлен." });
    } catch (err) {
      return res.status(500).send({ msg: err.message });
    }
  }

  async getProviders(_, res) {
    try {
      const providers = await ProvidersModel.find();
      return res.status(200).send(providers);
    } catch (err) {
      return res.status(500).send({ msg: err.message });
    }
  }

  async updateProvider(req, res) {
    try {
      const { id } = req.params;
      const entries = Object.entries(req.body);
      const update = {};

      for (let [prop, val] of entries) {
        update[prop] = val;
      }

      const provider = await ProvidersModel.findOneAndUpdate(
        { _id: id },
        update
      ).exec();
      if (provider) {
        return res
          .status(200)
          .send({ msg: "Данные поставщика успешно изменены." });
      } else {
        return res
          .status(400)
          .send({ msg: "Не удалось изменить данные, попробуйте ещё раз." });
      }
    } catch (err) {
      return res.status(500).send({ msg: err.message });
    }
  }

  async deleteProvider(req, res) {
    try {
      const { id } = req.params;

      await ProvidersModel.findByIdAndRemove(id, (err, doc) => {
        if (doc) {
          return res.status(200).send({ msg: "Поставщик удалён." });
        }
        if (!doc && !err) {
          return res
            .status(200)
            .send({ mgs: "Поставщик уже удалён или не существует." });
        }
      });
    } catch (err) {
      return res.status(500).send({ msg: err.message });
    }
  }
}

module.exports = new ProvidersController();
