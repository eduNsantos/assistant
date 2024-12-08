// backend/routes/userRoutes.ts
import { Router, Request, Response } from 'express';
import UserController from '../controllers/UserController';
import ChatbotController from '../controllers/ChatbotController';

const router = Router();

router.get('/', ChatbotController.index);

router.post('/', ChatbotController.update);

// Rota para obter um usuário específico
router.get('/:id', (req: Request, res: Response) => {
    const userId = req.params.id; // Obtendo o ID do usuário a partir dos parâmetros da rota
    // Aqui você pode buscar o usuário pelo ID no banco de dados
    res.send(`User with ID: ${userId}`);
});

export default router;
