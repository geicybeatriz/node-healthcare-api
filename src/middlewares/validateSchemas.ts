import { NextFunction, Request, Response } from "express";
import { CustomError } from "../interfaces/customError";
import Joi from "joi";

export default function validateSchemas(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(422).send(error.details.map((detail: CustomError) => detail.message));
    }
    next();
  }
}