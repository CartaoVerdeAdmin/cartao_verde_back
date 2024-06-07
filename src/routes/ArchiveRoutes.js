import { Router } from "express";
import ArchiveController from "../Controllers/ArchiveController.js";
import verifyJwt from "../Middlewares/VerifyJwt.js";
import verifyIsAdm from "../Middlewares/VerifyisAdm.js";

const archiveRoutes = Router();

archiveRoutes.route("/archive").get(ArchiveController.getArchivesbyID);

export default archiveRoutes;
