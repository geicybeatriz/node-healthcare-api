import { Request, Response } from "express";
import patientsServices from "../services/patientsServices";

async function addPatient(req: Request, res: Response) {
  await patientsServices.createPatient(req.body);
  res.sendStatus(201);
}

async function updatePatientAndAddressDataByPatientId(req: Request, res: Response) {
  const { id } = req.params;
  const data = req.body;
  console.log(id, data);

  await patientsServices.updatePatientAndAddressDataByPatientId(parseInt(id), data);
  res.status(200).send("Dados atualizados com sucesso!")
}

const patientsController = {
  addPatient,
  updatePatientAndAddressDataByPatientId,

};

export default patientsController;