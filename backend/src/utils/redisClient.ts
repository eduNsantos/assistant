import { createClient, RedisClient, RedisClientType } from 'redis';

let redisClient: RedisClientType;

export const connectRedis = async (): Promise<void> => {

    try {
        redisClient = createClient({
            url: 'redis://localhost:6379',
            password: process.env.REDIS_PASSWORD
        });

        redisClient.on('error', (err) => console.error('Erro na conexão com o Redis:', err));

        redisClient.on('connect', () => {
            console.log('aaa');
        });
        // Conecta ao Redis
        // await redisClient.connect();
        console.log('Conectado ao Redis com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao Redis:', error);
        throw error;
    }
};

// Função para obter o cliente Redis
export const getRedisClient = (): RedisClientType => {
    if (!redisClient) {
        throw new Error('Redis Client não inicializado. Certifique-se de chamar connectRedis primeiro.');
    }

    return redisClient;
};
