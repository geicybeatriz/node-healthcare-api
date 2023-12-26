import { Address } from "@prisma/client";

export type CreateAddressData = Omit<Address, "id">;

const addressServices = {};

export default addressServices;