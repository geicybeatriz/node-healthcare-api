import { Request, Response } from "express";
import patientsServices from "../services/patientsServices";

async function addPatient(req: Request, res: Response) {
  await patientsServices.createPatient(req.body);
  res.sendStatus(200);
}

const patientsController = {
  addPatient,
};

export default patientsController;