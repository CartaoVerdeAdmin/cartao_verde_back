import { Router } from "express";
import CertificateValidator from "../Validators/CertificateValidator.js";
import CertificateController from "../Controllers/CertificateController.js";

const certificateRoutes = Router();

certificateRoutes
  .route("/")
  .post(CertificateValidator.create, CertificateController.create)
  .get(CertificateController.read);

certificateRoutes
  .route("/:id")
  .delete(CertificateValidator.destroy, CertificateController.destroy)
  .put(CertificateValidator.update, CertificateController.update);
export default certificateRoutes;
