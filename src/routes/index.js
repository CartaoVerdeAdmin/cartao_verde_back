import { Router } from "express";

import userRoutes from "./UserRoutes.js";
import categoryTreeRoutes from "./CategoryTreeRoutes.js";
import treeRoutes from "./TreeRoutes.js";
import archiveRoutes from "./ArchiveRoutes.js";

const routes = Router();

routes
  .use("/user", userRoutes)
  .use("/tree", treeRoutes)
  .use("/archive", archiveRoutes)
  .use("/categoryType", categoryTreeRoutes)
  
export default routes;
