import CategoryPriceModel from "../Models/CategoryTreeModel.js";

class CategoryController {
  async create(req, res) {
    try {
      const category = await CategoryPriceModel.create(req.body);
      return res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }

  async read(req, res) {
    try {
      const category = await CategoryPriceModel.find(req.body);
      return res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }

  async readByName(req, res) {
    try {
      const { name } = req?.query;
      const regexName = new RegExp(name, "i");
      const categoryPrice = await CategoryPriceModel.find({
        name: regexName,
      }).sort("name");
      return res.status(200).json(categoryPrice);
    } catch (error) {
      return res.status(500).json({
        message: "Erro while fetching CategoryPrice by name",
        error: error.message,
      });
    }
  }
  async readNames(req, res) {
    try {
      const names = await CategoryPriceModel.find({}, { name: 1 });
      const namesArray = names.map((ia) => ia.name);
      return res.status(200).json(namesArray);
    } catch (error) {
      res.status(500).json({
        message: "Error while fetching CategoryPrice names",
        error: error.message,
      });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const foundCategory = await CategoryPriceModel.findById(id);
      if (!foundCategory) {
        return res.status(404).json({ message: "Category not found!" });
      }
      await foundCategory.deleteOne();
      res.status(200).json({
        message: "Category successfully deleted!",
      });
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const foundCategory = await CategoryPriceModel.findById(id);
      if (!foundCategory) return res.status(404).json({ message: "Category not found!" });
      const category = await foundCategory.set(req.body).save();
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }
}

export default new CategoryController();
