// backend/routes/userRoutes.ts
import { Router, Request, Response } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

router.get('/', UserController.index);

router.post('/', UserController.store);
router.put('/', UserController.update);

// Rota para obter um usuário específico
router.get('/:id', (req: Request, res: Response) => {
    const userId = req.params.id; // Obtendo o ID do usuário a partir dos parâmetros da rota
    // Aqui você pode buscar o usuário pelo ID no banco de dados
    res.send(`User with ID: ${userId}`);
});

export default router;
