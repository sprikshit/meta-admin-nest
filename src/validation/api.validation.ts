import * as Joi from 'joi';

import { IRegistration } from 'src/interface/register.if';




export default class ApiValidation{
    constructor(){}
    registerSchema = Joi.object<IRegistration>({
        name: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string(),
        role: Joi.string(),
    });
}