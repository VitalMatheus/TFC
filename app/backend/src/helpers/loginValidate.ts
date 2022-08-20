import * as Joi from 'joi';
import { Iuser } from '../interfaces/interfaces';

export default function loginValidate(user: Iuser) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { email, password } = user;
  const validate = schema.validate({ email, password });
  const { error } = validate;

  if (error) return { status: 400, message: { message: 'All fields must be filled' } };
}
