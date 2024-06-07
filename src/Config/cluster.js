import cluster from "cluster";

import isDevEnvironment from "../Utils/general/isDevEnvironment.js";
import logger from "./logger.js";
import startServer from "./Server/startServer.js";

function runPrimaryProcess() {
  const processesCount = process.env.CPUS | require("os").cpus().length;

  for (let index = 0; index < processesCount; index += 1) cluster.fork();

  cluster.on("exit", (worker, code) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      logger.error(`Worker ${worker.process.pid} exit`);
      cluster.fork();
    }
  });
}

export default function startClusterServerInProd() {
  if (isDevEnvironment) return startServer();

  return cluster.isPrimary ? runPrimaryProcess() : startServer();
}
