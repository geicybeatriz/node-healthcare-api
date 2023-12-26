import Joi from "joi";

const addPatientSchema = Joi.object({
  patientData: Joi.object({
    nome: Joi.string().required(),
    apelido: Joi.string().allow(''),
    email: Joi.string().email().allow(''),
    telefone: Joi.string().allow(''),
    nacionalidade: Joi.string().allow(''),
    genero: Joi.string().valid('Male', 'Female', 'NonBinary', 'Other', 'PreferNotToSay').required(),
    dataNascimento: Joi.string().required(),
    cpf: Joi.string().allow(''),
    rg: Joi.string().allow(''),
    estadoCivil: Joi.string().valid('Single', 'Married', 'Divorced', 'Widowed', 'Other', 'PreferNotToSay').required(),
    observacoes: Joi.string().allow('')
  }),
  addressData: Joi.object({
    cep: Joi.string().required(),
    logradouro: Joi.string().required(),
    numero: Joi.string().required(),
    cidade: Joi.string().required(),
    uf: Joi.string().required(),
    bairro: Joi.string().required(),
    complemento: Joi.string().allow('')
  })
});

export default addPatientSchema;