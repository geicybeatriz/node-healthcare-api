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
  const patient = await prisma.patient.findUnique({
    where: { id }
  });
  return patient;
}

async function getAllPatientsData() {
  const patients = await prisma.patient.findMany({
    select: {
      id: true,
      nome: true,
      cpf: true,
      dataNascimento: true,
      email: true,
      address: {
        select: {
          cidade: true
        }
      }
    }
  })
  return patients;
}

async function getAllPatientsByName(term: string) {
  const patients = await prisma.patient.findMany({
    select: { id: true, nome: true },
    where: {
      nome: {
        contains: term,
        mode: "insensitive"
      }
    }
  });
  return patients;
}

async function deletePatientsDataById(id: number) {
  const deletePatient = await prisma.patient.delete({
    where: { id }
  });
  return deletePatient;
}

const patientsRepository = {
  addPatient,
  getPatientByName,
  updatePatientDataById,
  getPatientDataById,
  getAllPatientsData,
  getAllPatientsByName,
  deletePatientsDataById,
};

export default patientsRepository;