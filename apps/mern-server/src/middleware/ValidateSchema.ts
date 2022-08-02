import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';

import { IUser } from '../models/User';
import { IProject } from '../models/Project';
import Logging from '../library/logging';

export const ValidateJoi = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      Logging.error(error);
      return res.status(422).json({ error });
    }
  };
};

export const Schemas = {
  user: {
    create: Joi.object<IUser>({
      name: Joi.string().required()
    }),
    update: Joi.object<IUser>({
      name: Joi.string().required()
    })
  },
  project: {
    create: Joi.object<IProject>({
      creator: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      name: Joi.string().required()
    }),
    update: Joi.object<IProject>({
      creator: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      name: Joi.string().required()
    })
  }
};
