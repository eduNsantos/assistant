import express, { Request, Response } from 'express';
import cors from 'cors';
import '../typeorm.config';
import userRoutes from './routes/userRoutes'; // Importando as rotas
import authRoutes from './routes/authRoutes'; // Importando as rotas
import { connectRedis } from './utils/redisClient';
import isAuthenticated from './middleware/isAuthenticated';

const app = express();
app.use(express.json());
app.use(cors());



// Usando as
app.use('/api/user', isAuthenticated, userRoutes); // Prefixando as rotas com '/api'
app.use('/api/auth', authRoutes); // Prefixando as rotas com '/api'

const PORT = 4000;
app.listen(PORT, async () => {
    await connectRedis();

    console.log(`Server running on port ${PORT}`)
});
