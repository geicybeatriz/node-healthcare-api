import { Patient } from "@prisma/client";
import patientsRepository from "../repositories/patientsRepository";
import { CreateAddressData } from "./addressServices";
import addressRepository from "../repositories/addressRepository";

export type CreatePatientData = Omit<Patient, 'id'>

interface NewPatientInfo {
  patientData: CreatePatientData;
  addressData: CreateAddressData;
}

async function createPatient(data: NewPatientInfo) {
  const patient: CreatePatientData = data.patientData;
  await checkPatientByNameAndCpf(patient.nome, patient.cpf);
  const newPatientId = await patientsRepository.addPatient(patient);
  const address: CreateAddressData = { ...data.addressData, patientId: newPatientId };
  await addressRepository.addAddressByPatientId(address);
  return;
}

async function checkPatientByNameAndCpf(name: string, cpf: string) {
  const patient = await patientsRepository.getPatientByName(name, cpf);
  if (patient) {
    throw { type: "conflict", message: "O paciente já está cadastrado no sistema." }
  }
  return;
}



const patientsServices = {
  createPatient,
  checkPatientByNameAndCpf

};

export default patientsServices;