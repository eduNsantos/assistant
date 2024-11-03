import express, { Request, Response } from 'express';
import cors from 'cors';
import '../typeorm.config';
import userRoutes from './routes/userRoutes'; // Importando as rotas

const app = express();
app.use(express.json());
app.use(cors());

// Usando as rotas
app.use('/api', userRoutes); // Prefixando as rotas com '/api'

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
