
import patientsController from "../controllers/patientsController";
import { Router } from "express";
import validateSchemas from "../middlewares/validateSchemas";
import addPatientSchema from "../schemas/addPatientSchema";

const patientsRouter = Router();

patientsRouter.post("/", validateSchemas(addPatientSchema), patientsController.addPatient);

export default patientsRouter;