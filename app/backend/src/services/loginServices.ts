import * as Jwt from 'jsonwebtoken';
import loginValidate from '../helpers/loginValidate';
import { Iuser } from '../interfaces/interfaces';
import User from '../database/models/users';

const loginService = {
  getUser: async (user: Iuser) => {
    const validated = loginValidate(user);
    if (validated) return validated;

    const { email, password } = user;
    const data = await User.findOne({
      where: { email, password },
      raw: true,
    });
    if (!data) return { status: 401, message: { message: 'Incorrect email or password' } };

    const secret = 'secret';
    const token = Jwt.sign({ data }, secret);
    return { status: 200, message: { token } };
  },
};

export default loginService;
