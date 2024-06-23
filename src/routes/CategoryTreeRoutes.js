import { Router } from "express";
import CategoryTreeValidator from "../Validators/CategoryTreeValidator.js";
import CategoryController from "../Controllers/CategoryTreeController.js";

const categoryTreeRoutes = Router();

categoryTreeRoutes
  .route("/")
  .get(CategoryController.read)
  .post(CategoryTreeValidator.create, CategoryController.create);

categoryTreeRoutes
  .route("/:id")
  .delete(CategoryTreeValidator.destroy, CategoryController.destroy)
  .put(CategoryTreeValidator.update, CategoryController.update);

categoryTreeRoutes.route("/search-by-name").get(CategoryController.readByName);
categoryTreeRoutes.route("/names").get(CategoryController.readNames);

export default categoryTreeRoutes;
