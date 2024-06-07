import "../../Errors/unhandledErrors.js"; // To handle unhandled rejections and uncaught exceptions

import expressConfig from "../express.js";
import logger from "../logger.js";
import mongoConfig from "../mongoDB.js";
import setGracefulShutdown from "./setGracefulShutdown.js";

export default async function startServer() {
  try {
    const databaseConnection = await mongoConfig();
    const serverConnection = await expressConfig();

    setGracefulShutdown({
      serverConnection,
      databaseConnection,
    });
  } catch (err) {
    logger.error(err, "App exited with failure");
    process.exit(1);
  }
}
