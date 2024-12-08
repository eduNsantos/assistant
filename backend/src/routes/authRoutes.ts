// backend/routes/userRoutes.ts
import { Router, Request, Response } from 'express';

import AuthControler from '../controllers/AuthController';
import isAuthenticated from '../middleware/isAuthenticated';
import UserController from '../controllers/UserController';

const router = Router();

router.post('/login', AuthControler.login);

router.post('/register', UserController.store);

router.post('/refresh', isAuthenticated, AuthControler.refreshToken);

router.post('/logout', isAuthenticated, AuthControler.logout);

export default router;

