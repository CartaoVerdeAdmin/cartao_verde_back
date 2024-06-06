import logger from "../Config/logger.js";

process
  .on("unhandledRejection", (reason, promise) => {
    logger.error(
      `App exiting due to an unhandled promise ${JSON.stringify(promise)} and reason: ${reason}`
    );
    throw reason;
  })
  .on("uncaughtException", (error) => {
    logger.error(error, "App exiting due to an uncaught exception");
    process.exit(1);
  });
