import { Router } from "express";
import TreeController from "../Controllers/TreeController.js";
import TreeValidator from "../Validators/TreeValidator.js";
import verifyJwt from "../Middlewares/VerifyJwt.js";
import verifyIsAdm from "../Middlewares/VerifyisAdm.js";

const treeRoutes = Router();

treeRoutes
  .route("/")
  .post(
    verifyJwt,
    verifyIsAdm,

    TreeValidator.create,
    TreeController.create
  )
  .get(TreeValidator.read, TreeController.read);

treeRoutes
  .route("/:id")
  .put(verifyJwt, verifyIsAdm, TreeValidator.update, TreeController.update)
  .delete(TreeValidator.destroy, TreeController.delete);

treeRoutes.route("/search-by-date").get(TreeController.filterCategories);

export default treeRoutes;
