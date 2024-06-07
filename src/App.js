import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";

import { NotFoundError } from "./Errors/baseErrors.js";
import corsOptions from "./Config/cors.js";
import isDevEnvironment from "./Utils/general/isDevEnvironment.js";
import routes from "./routes/index.js";
import errorHandler from "./Middlewares/errorHandler.js";

const app = express();

app.use(bodyParser.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());
if (isDevEnvironment) app.use(morgan("dev"));
app.use(routes);

// Non existing routes
app.use("*", (req, res, next) => {
  next(new NotFoundError(`Route '${req.baseUrl}' not found`));
});

// Must be after routes

app.use(errorHandler);

export default app;
