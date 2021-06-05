const detailsModel = require("../models/details.model");

class DetailsController {
  async createDetail(req, res) {
    try {
      const { name, price, priceWithInstall, provider, description, type } =
        req.body;

      if (!name || !price || !provider) {
        return res.status(400).send({
          msg: "Пожалуйста заполните обязательные поля(название, цена, поставщик).",
        });
      }

      const detail = await detailsModel.findOne({ name }).exec();

      if (detail) {
        return res
          .status(400)
          .send({ msg: "Деталь с таким именем уже существует." });
      }

      await detailsModel.create({
        name,
        price,
        priceWithInstall,
        provider,
        description,
        type,
      });

      return res.status(200).send({ msg: "Деталь успешно добавлена в базу." });
    } catch (err) {
      return res.status(500).send({ msg: err.message });
    }
  }

  async getDetails(_, res) {
    try {
      const details = await detailsModel.find();

      return res.status(200).send(details);
    } catch (err) {
      return res.status(500).send({ msg: err.message });
    }
  }

  async updateDetail(req, res) {
    try {
      const { id } = req.params;
      const entries = Object.entries(req.body);
      const update = {};
      for (let [prop, val] of entries) {
        update[prop] = val;
      }
      const detail = await detailsModel
        .findOneAndUpdate({ _id: id }, update)
        .exec();
      if (detail) {
        return res.status(200).send({ msg: "Данные успешно изменены." });
      } else {
        return res
          .status(400)
          .send({ msg: "Не удалось изменить данные, попробуйте ещё раз." });
      }
    } catch (err) {
      return res.status(500).send({ msg: err.message });
    }
  }

  async deleteDetail(req, res) {
    try {
      const { id } = req.params;

      const detail = await detailsModel.findByIdAndRemove(id).exec();

      if (detail) {
        return res.status(200).send({ msg: "Деталь успешно удалена из базы." });
      } else {
        return res
          .status(400)
          .send({ msg: "Не удалось удалить деталь, попробуйте ещё раз." });
      }
    } catch (err) {
      return res.status(500).send({ msg: err.message });
    }
  }
}

module.exports = new DetailsController();
