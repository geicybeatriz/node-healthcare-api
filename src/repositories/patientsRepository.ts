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

async function updatePatientDataById(id: number, data: CreatePatientData) {
  const patient = await prisma.patient.update({
    data: data,
    where: { id }
  });
  return patient;
}

async function getPatientDataById(id: number) {
  const patient = await prisma.patient.findFirst({
    where: { id }
  });
  return patient;
}

const patientsRepository = {
  addPatient,
  getPatientByName,
  updatePatientDataById,
  getPatientDataById,
};

export default patientsRepository;