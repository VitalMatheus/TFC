import { Router } from 'express';
import leaderboardController from '../controllers/leaderboardController';

const route = Router();

route.get('/leaderboard/home', leaderboardController.homeBoard);

export default route;
