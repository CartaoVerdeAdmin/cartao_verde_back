import TreeModel from "../Models/TreeModel.js";
import ArchiveController from "./ArchiveController.js";
import CategoryTreeModel from "../Models/CategoryTreeModel.js";

class TreeController {
  async create(req, res) {
    try {
      const { name, location, description, total_quantity, id_category, price, ...archive } =
        req.body;
      const categoryTypeIds = await Promise.all(
        id_category.map(async (categoryName) => {
          const categoryType = await CategoryTreeModel.findOne({ name: categoryName });

          return categoryType ? categoryType._id : null;
        })
      );

      const archiveID = await ArchiveController.create({ ...archive });
      const myTree = await TreeModel.create({
        name,
        location,
        description,
        price,
        total_quantity,
        available_quantity: total_quantity,
        id_category: categoryTypeIds,
        archive: archiveID,
      });
      return res.status(200).json(myTree);
    } catch (error) {
      res.status(500).json({ message: "Error while creating Tree", error: error.message });
    }
  }

  async read(req, res) {
    try {
      const myTree = await TreeModel.find({ available_quantity: { $gt: 0 } }).populate("archive").populate("id_category");

      return res.status(200).json(myTree);
    } catch (error) {
      res.status(500).json({ message: "Error while fetching Tree cards", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, location, description, total_quantity, id_category, price, ...archivesObject } =
        req.body;
      const oldArchives = await TreeModel.findById(id).populate("archive");
      const archiveID = await ArchiveController.update({
        files: archivesObject.archive,
        name: name,
        oldArchives: oldArchives.archive,
      });
      const myTree = await TreeModel.findById(id);

      if (total_quantity != 0) {
        let newQuantity = total_quantity - myTree.total_quantity;

        await TreeModel.updateOne(
          { _id: id },
          {
            $inc: { available_quantity: newQuantity },
            name,
            location,
            description,
            total_quantity,
            price,
            id_category,
            archive: archiveID,
          }
        );
      } else {
        await TreeModel.updateOne(
          { _id: id },
          {
            name,
            location,
            description,
            price,
            id_category,
            archive: archiveID,
          }
        );
      }
      return res.status(200).json({});
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error while updating tree", error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const myTree = await TreeModel.findById(id);
      if (!myTree) {
        return res.status(404).json({ message: "Tree not found" });
      }
      await TreeModel.findByIdAndDelete(id);
      return res.status(200).json({ messsage: "Tree deleted successfully!" });
    } catch (error) {
      return res.status(500).json({ message: "Error while deleting tree", error: error.message });
    }
  }

  async filterCategories(req, res) {
    try {
      const { dateRange } = req.query;
      let myTrees = [];
      myTrees = await TreeModel.find();
      if (dateRange && dateRange.initialDate && dateRange.finalDate) {
        myTrees = myTrees.filter(
          (myTree) =>
            myTree.createdAt >= new Date(dateRange.initialDate) &&
            myTree.createdAt <= new Date(dateRange.finalDate)
        );
      } else if (dateRange && dateRange.oneDate) {
        const oneDate = new Date(dateRange.oneDate);

        const startOfDay = new Date(oneDate.getFullYear(), oneDate.getMonth(), oneDate.getDate());
        const endOfDay = new Date(
          oneDate.getFullYear(),
          oneDate.getMonth(),
          oneDate.getDate(),
          23,
          59,
          59
        );

        myTrees = myTrees.filter(
          (myTree) => myTree.createdAt >= startOfDay && myTree.createdAt <= endOfDay
        );
      }
      const uniquemyTreeObjects = () => {
        const mapIds = new Map();
        const UniqueArray = [];
        myTrees.forEach((obj) => {
          if (!mapIds.has(obj._id)) {
            mapIds.set(obj._id, true);
            UniqueArray.push(obj);
          }
        });
        return UniqueArray;
      };

      let filteredmyTrees = uniquemyTreeObjects();
      const populatedPromises = filteredmyTrees.map(async (myTree) => {
        const populatedmyTree = await TreeModel.populate(myTree, "archive id_categoryType");
        return populatedmyTree;
      });

      filteredmyTrees = await Promise.all(populatedPromises);

      return res.status(200).json(filteredmyTrees);
    } catch (error) {
      res.status(500).json({ message: "Error while filtering myTrees", error: error.message });
    }
  }
}

export default new TreeController();
