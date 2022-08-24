import { NextFunction, Request, Response } from 'express';
import matchesServices from '../services/matchesServices';
import matchesValidate from '../helpers/matchesValidate';
import validateToken from '../helpers/jwtValidate';

const matchesController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    const data = await matchesServices.getAll();
    if (req.query.inProgress) return next();
    return res.status(200).json(data);
  },

  getFiltered: async (req: Request, res: Response) => {
    const data = await matchesServices.getAll();
    const { inProgress } = req.query;
    const result = data.filter((obj) => obj.inProgress === (inProgress === 'true'));
    return res.status(200).json(result);
  },

  insertMatch: async (req: Request, res: Response) => {
    const validated = await matchesValidate(req.body);
    if (validated) return res.status(validated.status).json(validated.message);

    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token must be a valid token' });
    try {
      validateToken(token);
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    const data = await matchesServices.insertMatch(req.body);
    return res.status(201).json(data);
  },

  finishMatch: async (req: Request, res: Response) => {
    await matchesServices.finishMatch(+req.params.id);
    return res.status(200).json({ message: 'Finished' });
  },

  updateGoals: async (req: Request, res: Response) => {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { id } = req.params;
    await matchesServices.updateGoals({ homeTeamGoals, awayTeamGoals, id: +id });
    return res.status(200).json({ message: 'goool' });
  },
};

export default matchesController;
