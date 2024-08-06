import { Router } from "express";

import userRoutes from "./UserRoutes.js";
import categoryTreeRoutes from "./CategoryTreeRoutes.js";
import treeRoutes from "./TreeRoutes.js";
import archiveRoutes from "./ArchiveRoutes.js";
import certificateRoutes from "./CertificateRoutes.js";
import pixpaymentRoutes from "./PixPaymentRoutes.js";

const routes = Router();

routes
  .use("/user", userRoutes)
  .use("/tree", treeRoutes)
  .use("/archive", archiveRoutes)
  .use("/categoryTree", categoryTreeRoutes)
  .use("/certificate", certificateRoutes);
  .use("/pixpayment", pixpaymentRoutes);

export default routes;
