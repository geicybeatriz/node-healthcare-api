import prisma from "../config/database";
import { CreateAddressData } from "../services/addressServices";

async function addAddressByPatientId(data: CreateAddressData) {
  const address = await prisma.address.create({ data });
  return address;
}

const addressRepository = {
  addAddressByPatientId,
};

export default addressRepository;