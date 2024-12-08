import { IRouterMatcher, NextFunction, Request, Response } from "express";

import jwt from 'jsonwebtoken';
import { getRedisClient } from "../utils/redisClient";

interface User {
    id: number,
    iat: number,
    expiresAt: number,
    audience: string,
    issuer: string
}

export interface AuthenticatedRequest extends Request {
    user: User
}

export default async function isAuthenticated(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>  {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: "Token não fornecido" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            audience: process.env.JWT_AUDIENCE,
            issuer: process.env.JWT_ISSUER,
        }) as User;

        req.user = decoded;

        const redis = getRedisClient();

        const refreshToken = await redis.get(`refreshToken:2`)

        console.log(refreshToken + ' ' + `refreshToken:${decoded.id}`);
        // if (refreshToken = jwt)

        next();
    } catch (err) {
        console.log(err);
        res.status(403).json({ message: "Token inválido ou expirado" });
    }
}
