// backend/routes/userRoutes.ts
import { Router, Request, Response } from 'express';

import AuthControler from '../controllers/AuthController';
import isAuthenticated from '../middleware/isAuthenticated';

const router = Router();

router.post('/login', AuthControler.login);

router.post('/refresh', isAuthenticated, AuthControler.refreshToken);

export default router;
