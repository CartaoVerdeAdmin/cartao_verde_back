import { Router } from "express";
import PixPayment from "../PixPayment/PixPayment.js";

const pixpaymentRoutes = Router();

pixpaymentRoutes.route("/").post(PixPayment.create);

export default pixpaymentRoutes;
