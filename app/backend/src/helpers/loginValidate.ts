import * as Joi from 'joi';
import { Iuser } from '../interfaces/interfaces';

export default function loginValidate(user: Iuser) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { email, password } = user;
  const validate = schema.validate({ email, password });
  const { error } = validate;

  if (error) return { status: 400, message: { message: error.message } };
}
