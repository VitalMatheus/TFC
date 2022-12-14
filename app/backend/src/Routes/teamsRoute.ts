import { Router } from 'express';
import teamsController from '../controllers/teamsControllers';

const route = Router();

route.get('/teams/:id', teamsController.getOne);
route.get('/teams', teamsController.getAll);

export default route;
