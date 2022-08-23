import { NextFunction, Request, Response } from 'express';
import matchesServices from '../services/matchesServices';

const matchesController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    const data = await matchesServices.getAll();
    if (!req.query.inProgress) return res.status(200).json(data);
    next();
  },

  getFiltered: async (req: Request, res: Response) => {
    const data = await matchesServices.getAll();
    const { inProgress } = req.query;
    const result = data.filter((obj) => obj.inProgress === (inProgress === 'true'));
    return res.status(200).json(result);
  },

  insertMatch: async (req: Request, res: Response) => {
    const data = await matchesServices.insertMatch(req.body);
    if (data.homeTeam === data.awayTeam) {
      return res
        .status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    return res.status(201).json(data);
  },

  updateInProgress: async (req: Request, res: Response) => {
    await matchesServices.updateInProgress(+req.params.id);
    return res.status(200).json({ message: 'Finished' });
  },
};

export default matchesController;
