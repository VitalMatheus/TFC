import { Request, Response } from 'express';
import leaderboardServices from '../services/leaderboardServices';

const leaderboardController = {
  homeBoard: async (req: Request, res: Response) => {
    const data = await leaderboardServices.homeBoard();
    return res.status(200).json(data);
  },

  awayBoard: async (req: Request, res: Response) => {
    const data = await leaderboardServices.awayBoard();
    return res.status(200).json(data);
  },

  leaderBoard: async (req: Request, res: Response) => {
    const data = await leaderboardServices.leaderBoard();
    const result = data.sort((a, b) => a.goalsOwn - b.goalsOwn)
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalVictories - a.totalVictories)
      .sort((a, b) => b.totalPoints - a.totalPoints);
    return res.status(200).json(result);
  },
};

export default leaderboardController;
