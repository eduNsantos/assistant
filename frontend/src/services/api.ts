import axios from "axios";
import { refreshToken } from "../utils/token";
import { useAuthStore } from '../store/authStore';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(async (config: any) => {
    const token = useAuthStore.getState().token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Middleware para renovar o token automaticamente
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            const { setToken } = useAuthStore();
            const newToken = await refreshToken();
            if (newToken) {
                setToken(newToken);
                error.config.headers.Authorization = `Bearer ${newToken}`;
                return axios.request(error.config); // Reenvia a requisição original
            }
        }
        return Promise.reject(error);
    }
);

export default api;
// const axios = new axios