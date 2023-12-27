import cors from "cors";
import express from "express";
import "express-async-errors";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware";
import patientsRouter from "./routers/patientsRouter";

const app = express();

app.use(cors())
  .use(express.json())
  .use("/", patientsRouter)
  .use(errorHandlerMiddleware)

export default app;