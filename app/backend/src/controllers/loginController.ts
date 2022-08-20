import { Request, Response } from 'express';
import loginService from '../services/loginServices';

const loginController = {
  getUser: async (req: Request, res: Response) => {
    const token = await loginService.getUser(req.body);
    const { status, message } = token;
    return res.status(status).json(message);
  },
};

export default loginController;
