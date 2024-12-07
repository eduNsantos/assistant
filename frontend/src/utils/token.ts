import * as jwt from 'jsonwebtoken';
import api from '../services/api';

interface User {
    id: string;
    name: string;
    role: string;
    expiresAt: number;
}


export const tokenInfo = (token: string) => {
    console.log(token);
    console.log('pog')
    if (token) {
        return jwt.decode(token);
    }

    return null;;
}

// Função para validar o token
export const isValidToken = (token: string): boolean => {
    try {
        const decoded = jwt.decode(token) as User;

        const currentTime = Math.floor(Date.now() / 1000);

        return decoded.expiresAt ? decoded.expiresAt > currentTime : false; // Verifica expiração
    } catch (error) {
        console.error("Token inválido:", error);
        return false;
    }
};

export const refreshToken = async () => {
    try {
        const response = await api.post<any>('/auth/refresh', {}, {
            withCredentials: true
        });

        return response.data.token;
    } catch (error) {
        console.error("Erro ao renovar o token:", error);
        return null;
    }

}

