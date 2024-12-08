// backend/routes/userRoutes.ts
import { Router, Request, Response } from 'express';
import ChatbotController from '../controllers/ChatbotController';
import isAuthenticated from '../middleware/isAuthenticated';

const router = Router();

router.get('/', isAuthenticated, ChatbotController.index);

router.post('/', isAuthenticated, ChatbotController.store);

router.get('/:chatbotId', isAuthenticated, ChatbotController.show);

export default router;
