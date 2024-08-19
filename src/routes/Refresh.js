import { Router } from "express";
import UserController from "../Controllers/UserController.js";

const refreshRoutes = Router();

refreshRoutes.route("/").get(UserController.refreshToken).delete(UserController.logout);

export default refreshRoutes;
