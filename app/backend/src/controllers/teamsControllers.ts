import { Request, Response } from 'express';
import teamsServices from '../services/teamsServices';

const teamsControllers = {
  getAll: async (req: Request, res: Response) => {
    const data = await teamsServices.getAll();
    return res.status(200).json(data);
  },

  getOne: async (req: Request, res: Response) => {
    const data = await teamsServices.getOne(+req.params.id);
    return res.status(200).json(data);
  },
};

export default teamsControllers;
