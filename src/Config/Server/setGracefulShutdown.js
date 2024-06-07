import logger from "../logger.js";

// Gracefull shutdown
export default function setGracefulShutdown({ serverConnection, databaseConnection }) {
  const exitSignals = ["SIGINT", "SIGTERM", "SIGQUIT"];
  exitSignals.forEach((signal) => {
    process.on(signal, () => {
      serverConnection.close(async () => {
        try {
          await databaseConnection.connection.close(false);
          logger.info(`App exited with success`);
          process.exit(0);
        } catch (error) {
          logger.error(error, "App exited with failure");
          process.exit(1);
        }
      });
    });
  });
}
