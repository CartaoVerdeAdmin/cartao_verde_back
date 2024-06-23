import { Router } from "express";
import TreeController from "../Controllers/TreeController.js";
import TreeValidator from "../Validators/TreeValidator.js";
import verifyJwt from "../Middlewares/VerifyJwt.js";
import verifyIsAdm from "../Middlewares/VerifyisAdm.js";

const treeRoutes = Router();

treeRoutes.route("/treeCards").post(TreeValidator.read, TreeController.read);

treeRoutes.route("/").post(TreeController.create).get(TreeValidator.read, TreeController.read);

treeRoutes
  .route("/:id")
  .put(TreeValidator.update, TreeController.update)
  .delete(TreeValidator.destroy, TreeController.delete);

treeRoutes.route("/favorite").get(TreeController.checkFavorited);
treeRoutes.route("/search-by-date").get(TreeController.filterCategories);

export default treeRoutes;
