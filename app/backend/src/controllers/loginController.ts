import { Request, Response } from 'express';
import loginService from '../services/loginServices';

const loginController = {
  getUser: async (req: Request, res: Response) => {
    const data = await loginService.getUser(req.body);
    const { status, message } = data;
    return res.status(status).json(message);
  },
};

export default loginController;
