import { Router } from 'express';
import matchesController from '../controllers/matchesController';

const route = Router();

route.get('/matches', matchesController.getAll, matchesController.getFiltered);
route.post('/matches', matchesController.insertMatch);

export default route;
