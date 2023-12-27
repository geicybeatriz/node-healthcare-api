import { Address, Patient } from "@prisma/client";
import patientsRepository from "../repositories/patientsRepository";
import addressServices, { CreateAddressData } from "./addressServices";
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
    throw { type: "conflict", message: "O paciente já está cadastrado no sistema!" }
  }
  return;
}

async function checkPatientById(id: number) {
  const patient = await patientsRepository.getPatientDataById(id);
  if (!patient) {
    throw { type: "not found", message: "O paciente não está cadastrado no sistema!" }
  };
  return patient;
}

async function updatePatientAndAddressDataByPatientId(id: number, data: NewPatientInfo) {
  const patient: CreatePatientData = data.patientData;
  await checkPatientById(id);
  await addressServices.checkAddressDataByPatientId(id);
  await patientsRepository.updatePatientDataById(id, patient);
  const address: CreateAddressData = { ...data.addressData, patientId: id };
  await addressRepository.updateAddressDataByPatientId(id, address);
  return;
}

async function getPatientAndAddressDataById(id: number) {
  const patient: Patient = await checkPatientById(id);
  const address: Address = await addressRepository.getAddressByPatientId(id);
  return { patient, address };
}

const patientsServices = {
  createPatient,
  checkPatientByNameAndCpf,
  updatePatientAndAddressDataByPatientId,
  checkPatientById,
  getPatientAndAddressDataById
};

export default patientsServices;