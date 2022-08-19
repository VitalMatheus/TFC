import * as Jwt from 'jsonwebtoken';
import loginValidate from '../helpers/loginValidate';
import { Iuser } from '../interfaces/interfaces';
import User from '../database/models/users';

const loginService = {
  getUser: async (user: Iuser) => {
    const validated = loginValidate(user);
    if (validated) return validated;

    const { email } = user;
    const data = await User.findOne({
      where: { email },
      raw: true,
    });
    if (!data) return { status: 401, message: { message: 'Username or password invalid' } };

    const secret = 'xiii é segredo';
    const token = Jwt.sign({ data }, secret);
    const result = { status: 200, message: { token } };
    return result;
  },
};

export default loginService;
