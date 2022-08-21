import * as Jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import loginService from '../services/loginServices';

const loginController = {
  getUser: async (req: Request, res: Response) => {
    const token = await loginService.getUser(req.body);
    const { status, message } = token;
    return res.status(status).json(message);
  },

  getRole: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      const secret = process.env.JWT_SECRET || 'jwt_secret';

      if (!token) return res.status(401).json({ message: 'Token not found' });
      const result = Jwt.verify(token, secret);
      const [user] = Object.values(result);

      const role = await loginService.getRole(user);
      if (!role) res.status(401).json({ message: 'User not aloud' });
      return res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  },
};

export default loginController;
