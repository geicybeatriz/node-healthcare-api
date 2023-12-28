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

async function getAllPatientsData(req: Request, res: Response) {
  const term = req.query.term as string;
  const order = req.query.order as string;
  const patients = await patientsServices.getAllPatientsData(term, order);
  res.status(200).send(patients);
}

async function deletePatientById(req: Request, res: Response) {
  const { id } = req.params;
  await patientsServices.deletePatientsDataById(parseInt(id));
  res.status(200).send("Os dados do paciente foram removidos com sucesso!");
}

const patientsController = {
  addPatient,
  updatePatientAndAddressDataByPatientId,
  getPatientAndAddressDataById,
  getAllPatientsData,
  deletePatientById
};

export default patientsController;