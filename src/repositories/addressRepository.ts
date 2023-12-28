import prisma from "../config/database";
import { CreateAddressData } from "../services/addressServices";

async function addAddressByPatientId(data: CreateAddressData) {
  const address = await prisma.address.create({ data });
  return address;
}

async function updateAddressDataByPatientId(id: number, data: CreateAddressData) {
  const address = await prisma.address.update({
    data: data,
    where: { patientId: id }
  });
  return address;
}

async function getAddressByPatientId(id: number) {
  const address = await prisma.address.findFirst({
    where: { patientId: id }
  });
  return address;
}

async function deleteAddresByPatientId(id: number) {
  await prisma.address.delete({
    where: { patientId: id },
  });
  return;
}

const addressRepository = {
  addAddressByPatientId,
  updateAddressDataByPatientId,
  getAddressByPatientId,
  deleteAddresByPatientId
};

export default addressRepository;