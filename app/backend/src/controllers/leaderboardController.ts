import { Request, Response } from 'express';
import leaderboardServices from '../services/leaderboardServices';

const leaderboardController = {
  homeBoard: async (req: Request, res: Response) => {
    const data = await leaderboardServices.homeBoard();
    return res.status(200).json(data);
  },
};

export default leaderboardController;
