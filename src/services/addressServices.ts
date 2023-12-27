import { Address } from "@prisma/client";
import addressRepository from "../repositories/addressRepository";

export type CreateAddressData = Omit<Address, "id">;

async function checkAddressDataByPatientId(id: number) {
  const address = await addressRepository.getAddressByPatientId(id);
  if (!address) {
    throw { type: "not found", message: "O paciente já está cadastrado no sistema." }
  }
}

const addressServices = {
  checkAddressDataByPatientId
};

export default addressServices;