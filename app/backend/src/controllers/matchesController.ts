import { Request, Response } from 'express';
import matchesServices from '../services/matchesServices';

const matchesController = {
  getAll: async (req: Request, res: Response) => {
    const data = await matchesServices.getAll();
    return res.status(200).json(data);
  },
};

export default matchesController;
