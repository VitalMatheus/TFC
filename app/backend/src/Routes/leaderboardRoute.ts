import { Router } from 'express';
import leaderboardController from '../controllers/leaderboardController';

const route = Router();

route.get('/leaderboard/home', leaderboardController.homeBoard);
route.get('/leaderboard/away', leaderboardController.awayBoard);

export default route;
