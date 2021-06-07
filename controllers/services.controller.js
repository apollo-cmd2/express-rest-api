const servicesModel = require("../models/services.model");

class ServicesController {
  async createService(req, res) {
    try {
      const { name, price } = req.body;

      if (!name || !price) {
        return res.status(400).send({ msg: "Введите название услуги и цену." });
      }

      const service = await servicesModel.findOne({ name });

      if (service) {
        return res.status(400).send({ msg: "Такая услуга уже сущесвтует." });
      }

      await servicesModel.create({
        name,
        price,
      });
      return res.status(200).send({ msg: "Услуга создана." });
    } catch (err) {
      return res.status(500).send({ msg: err.message });
    }
  }

  async getServices(req, res) {
    try {
      const services = await servicesModel.find();

      return res.status(200).send(services);
    } catch (err) {
      return res.status(500).send({ msg: err.message });
    }
  }

  async updateService(req, res) {
    try {
      const { id } = req.params;
      const { name, price } = req.body;
      const update = {};

      if (name) {
        update.name = name;
      }

      if (price) {
        update.price = price;
      }

      await servicesModel.findOneAndUpdate({ _id: id }, update);

      return res.status(200).send({ msg: "Данные услуги успешно изменены." });
    } catch (err) {
      return res.status(500).send({ msg: err.message });
    }
  }

  async deleteService(req, res) {
    try {
      const { id } = req.params;

      await servicesModel.findOneAndRemove({ _id: id });

      return res.status(200).send({ msg: "Услуга удалена." });
    } catch (err) {
      return res.status(500).send({ msg: err.message });
    }
  }
}

module.exports = new ServicesController();
