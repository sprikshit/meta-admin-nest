import * as Joi from 'joi';
import { IRegistration } from 'src/interface/register.if';

export default class ApiValidation {
  constructor() {}

  registerSchema = Joi.object<IRegistration>({
    name: Joi.string().required().messages({
      'string.empty': 'Name is required',
    }),
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Email must be a valid email',
        'string.empty': 'Email is required',
      }),
    password: Joi.string()
      .min(6) 
      .required()
      .messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters long',
      }),
  });
}
