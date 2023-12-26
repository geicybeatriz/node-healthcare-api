-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'NonBinary', 'Other', 'PreferNotToSay');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('Single', 'Married', 'Divorced', 'Widowed', 'Other', 'PreferNotToSay');

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "apelido" TEXT,
    "email" TEXT,
    "telefone" TEXT,
    "nacionalidade" TEXT,
    "genero" "Gender" NOT NULL,
    "dataNascimento" TEXT NOT NULL,
    "cpf" TEXT,
    "rg" TEXT,
    "estadoCivil" TEXT,
    "observacoes" TEXT,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "cep" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "complemento" TEXT,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_patientId_key" ON "Address"("patientId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
