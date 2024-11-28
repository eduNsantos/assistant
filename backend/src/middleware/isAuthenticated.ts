import { NextFunction, Request, Response } from "express";

import jwt from 'jsonwebtoken';

interface User {
    sub: string,
    iat: number,
    expiresAt: number,
    audience: string,
    issuer: string
}

interface AuthenticatedRequest extends Request {
    user: User
}

export default function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Token não fornecido" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            audience: process.env.JWT_AUDIENCE,
            issuer: process.env.JWT_ISSUER,
        }) as User;

        req.user = decoded;

        next();
    } catch (err) {
        return res.status(403).json({ message: "Token inválido ou expirado" });
    }
}
