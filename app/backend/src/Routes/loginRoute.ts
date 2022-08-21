import { Router } from 'express';
import loginController from '../controllers/loginController';

const route = Router();

route.post('/login', loginController.getUser);
route.get('/login/validate', loginController.getRole);

export default route;
