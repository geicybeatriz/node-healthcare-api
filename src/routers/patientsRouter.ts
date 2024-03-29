
import patientsController from "../controllers/patientsController";
import { Router } from "express";
import validateSchemas from "../middlewares/validateSchemas";
import addPatientSchema from "../schemas/addPatientSchema";

const patientsRouter = Router();

patientsRouter
  .post("/patients", validateSchemas(addPatientSchema), patientsController.addPatient)
  .put("/patients/:id", validateSchemas(addPatientSchema), patientsController.updatePatientAndAddressDataByPatientId)
  .get("/patients/:id", patientsController.getPatientAndAddressDataById)
  .get("/patients", patientsController.getAllPatientsData)
  .delete("/patients/:id", patientsController.deletePatientById);

export default patientsRouter;