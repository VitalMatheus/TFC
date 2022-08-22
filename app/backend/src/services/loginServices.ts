import * as Jwt from 'jsonwebtoken';
import loginValidate from '../helpers/loginValidate';
import { Iuser, Iinfos } from '../interfaces/interfaces';
import User from '../database/models/users';

const loginService = {
  getUser: async (user: Iuser) => {
    const validated = loginValidate(user);
    if (validated) return validated;

    const { email } = user;

    const data = await User.findOne({
      where: { email },
      attributes: { exclude: ['password'] },
    });
    if (!data) return { status: 401, message: { message: 'Incorrect email or password' } };

    const secret = process.env.JWT_SECRET || 'jwt_secret';
    const token = Jwt.sign({ data }, secret);
    return { status: 200, message: { token } };
  },

  getRole: async (user: Iinfos) => {
    const { email } = user;
    const data = await User.findOne({
      where: { email },
      raw: true,
    });
    return data?.role;
  },
};

export default loginService;
