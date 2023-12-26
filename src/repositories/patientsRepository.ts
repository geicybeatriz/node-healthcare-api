import { Patient } from "@prisma/client";
import prisma from "../config/database";
import { CreatePatientData } from "../services/patientsServices";

async function addPatient(data: CreatePatientData) {
  const newPatient = await prisma.patient.create({ data });
  return newPatient.id;
}

async function getPatientByName(name: string, cpf: string) {
  const patient: Patient = await prisma.patient.findFirst({
    where: { nome: name, cpf }
  });
  return patient
}

const patientsRepository = {
  addPatient,
  getPatientByName,
};

export default patientsRepository;