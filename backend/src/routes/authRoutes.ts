// backend/routes/userRoutes.ts
import { Router, Request, Response } from 'express';

import AuthControler from '../controllers/AuthController';

const router = Router();

router.post('/login', AuthControler.login);

router.post('/refresh', AuthControler.refreshToken);

export default router;
