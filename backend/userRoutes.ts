// backend/routes/userRoutes.ts
import { Router, Request, Response } from 'express';

const router = Router();

// Rota para obter todos os usuários
router.get('/users', (req: Request, res: Response) => {
    // Aqui você pode buscar os usuários no banco de dados
    res.send('List of users');
});

// Rota para criar um novo usuário
router.post('/users', (req: Request, res: Response) => {
    const user = req.body; // Aqui você pode usar o corpo da requisição para criar um novo usuário
    // Código para salvar o usuário no banco de dados
    res.status(201).send(user);
});

// Rota para obter um usuário específico
router.get('/users/:id', (req: Request, res: Response) => {
    const userId = req.params.id; // Obtendo o ID do usuário a partir dos parâmetros da rota
    // Aqui você pode buscar o usuário pelo ID no banco de dados
    res.send(`User with ID: ${userId}`);
});

export default router;
