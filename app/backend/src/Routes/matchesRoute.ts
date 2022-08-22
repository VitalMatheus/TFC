import { Router } from 'express';
import matchesController from '../controllers/matchesController';

const route = Router();

route.get('/matches', matchesController.getAll);

export default route;