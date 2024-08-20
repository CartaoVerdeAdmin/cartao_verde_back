import { Router } from "express";

import CertificateValidator from "../Validators/CertificateValidator.js";
import CertificateController from "../Controllers/CertificateController.js";
import verifyJwt from "../Middlewares/VerifyJwt.js";
import verifyIsAdm from "../Middlewares/VerifyisAdm.js";
import verifyUser from "../Middlewares/VerifyUser.js";

const certificateRoutes = Router();

certificateRoutes
  .route("/")
  .post(CertificateValidator.create, CertificateController.create)
  .get(CertificateController.readAll);

certificateRoutes
  .route("/:id")
  .get(verifyJwt, verifyUser, CertificateController.readByUser)
  .delete(CertificateValidator.destroy, CertificateController.destroy)
  .put(verifyJwt, CertificateValidator.update, CertificateController.update);

export default certificateRoutes;
