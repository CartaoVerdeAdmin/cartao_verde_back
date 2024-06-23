import UserModel from "../Models/UserModel.js";
import TreeModel from "../Models/TreeModel.js";
import ArchiveController from "./ArchiveController.js";
import CategoryTreeModel from "../Models/CategoryTreeModel.js";

class TreeController {
  async create(req, res) {
    try {
      const { name, location, imageURL, especire, selectedOptions, ...archives } = req.body;

      const categoryTypeIds = await Promise.all(
        selectedOptions.id_categoryType.map(async (categoryName) => {
          const categoryType = await CategoryTreeModel.findOne({ name: categoryName });

          return categoryType ? categoryType._id : null;
        })
      );

      const archiveID = await ArchiveController.create({ ...archives });
      const myTree = await TreeModel.create({
        name,
        location,
        imageURL,
        especire,
        archive: archiveID,
      });
      return res.status(200).json(myTree);
    } catch (error) {
      res.status(500).json({ message: "Error while creating archive", error: error.message });
    }
  }

  async read(req, res) {
    try {
      const myTree = await TreeModel.find().populate("archive").populate("id_categoryType");

      return res.status(200).json(myTree);
    } catch (error) {
      res.status(500).json({ message: "Error while fetching myTree cards", error: error.message });
    }
  }

  async checkFavorited(req, res) {
    try {
      const { userId, myTreeId, enabled } = req.query;
      let isFavorited = false;
      if (enabled && enabled.toLowerCase() === "false") {
        return res.status(200).json(isFavorited);
      }
      const user = await UserModel.findById(userId).select("favoritesmyTrees");
      if (!user) return res.status(404).json({ message: "User not found" });

      isFavorited = user.favoritesmyTrees.includes(myTreeId);
      res.status(200).json(isFavorited);
    } catch (error) {
      res.status(500).json({ message: "Error while fetching User", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, link, shortDescription, longDescription, selectedOptions, ...archivesObject } =
        req.body;
      const oldArchives = await TreeModel.findById(id).populate("archive");
      const archiveID = await ArchiveController.update({
        files: archivesObject.archives,
        name: title,
        oldArchives: oldArchives.archive,
      });

      const categoryTypeIds = await Promise.all(
        selectedOptions.id_categoryType.map(async (categoryName) => {
          const categoryType = await CategoryTreeModel.findOne({ name: categoryName });

          return categoryType ? categoryType._id : null;
        })
      );
      const myTree = await TreeModel.findByIdAndUpdate(id, {
        title,
        shortDescription,
        longDescription,
        link,
        archive: archiveID,
        id_categoryType: categoryTypeIds,
      });
      return res.status(200).json({});
    } catch (error) {
      res.status(500).json({ message: "Error while updating archive", error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const myTree = await TreeModel.findById(id);
      await ArchiveController.deleteArchives(myTree.archive);
      await TreeModel.findByIdAndDelete(id);
      return res.status(200).json({ messsage: "Archive deleted successfully!" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error while deleting archive", error: error.message });
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
