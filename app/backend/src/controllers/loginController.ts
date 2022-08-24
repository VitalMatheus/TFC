import { Request, Response, NextFunction } from 'express';
import loginService from '../services/loginServices';
import validateToken from '../helpers/jwtValidate';

const loginController = {
  getUser: async (req: Request, res: Response) => {
    const token = await loginService.getUser(req.body);
    const { status, message } = token;
    return res.status(status).json(message);
  },

  getRole: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) return { status: 400, message: { message: 'Token not found' } };
      const [user] = Object.values(validateToken(token));

      const role = await loginService.getRole(user);
      if (!role) return res.status(401).json({ message: 'User not aloud' });
      return res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  },
};

export default loginController;
