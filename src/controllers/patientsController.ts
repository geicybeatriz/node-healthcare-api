import { Request, Response } from "express";
import patientsServices from "../services/patientsServices";

async function addPatient(req: Request, res: Response) {
  await patientsServices.createPatient(req.body);
  res.sendStatus(201);
}

async function updatePatientAndAddressDataByPatientId(req: Request, res: Response) {
  const { id } = req.params;
  const data = req.body;

  await patientsServices.updatePatientAndAddressDataByPatientId(parseInt(id), data);
  res.status(200).send("Dados atualizados com sucesso!")
}

async function getPatientAndAddressDataById(req: Request, res: Response) {
  const { id } = req.params;
  const response = await patientsServices.getPatientAndAddressDataById(parseInt(id));
  res.status(200).send(response);
}

const patientsController = {
  addPatient,
  updatePatientAndAddressDataByPatientId,
  getPatientAndAddressDataById,
};

export default patientsController;