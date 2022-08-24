import { Router } from 'express';
import matchesController from '../controllers/matchesController';

const route = Router();

route.get('/matches', matchesController.getAll, matchesController.getFiltered)
  .post('/matches', matchesController.insertMatch)
  .patch('/matches/:id/finish', matchesController.finishMatch)
  .patch('/matches/:id', matchesController.updateGoals);

export default route;
