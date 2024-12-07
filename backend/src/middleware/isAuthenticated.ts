import { IRouterMatcher, NextFunction, Request, Response } from "express";

import jwt from 'jsonwebtoken';

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

export default function isAuthenticated(req: AuthenticatedRequest, res: Response, next: NextFunction): void  {
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

        next();
    } catch (err) {
        console.log(err);
        res.status(403).json({ message: "Token inválido ou expirado" });
    }
}
