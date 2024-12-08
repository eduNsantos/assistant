import { Request, Response } from "express";
import { User } from "../entity/UserEntity";
import Joi from 'joi';
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
import { getRedisClient } from "../utils/redisClient";
import { AuthenticatedRequest } from "../middleware/isAuthenticated";

interface LoginBody {
    email: string,
    password: string
}

export default class AuthController {

    static async generateToken(userId: number, userName: string) {
        console.log(userId, userName)

        const issuedAt = Math.floor(Date.now() / 1000);
        const expiresAt = issuedAt + 60 * 60;
        const audience = process.env.JWT_AUDIENCE;
        const issuer = process.env.JWT_ISSUER;


        const payload = {
            id: userId,
            name: userName,
            role: 'user', // TODO: Criar role
            iat: issuedAt,
            issuer
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: expiresAt,
            audience: audience,
            issuer: issuer
        })

        return token;
    }

    static async generateRefreshToken(userId: number) {
        const issuedAt = Math.floor(Date.now() / 1000);
        const expiresAt = issuedAt + 60 * 60;
        const audience = process.env.JWT_AUDIENCE;
        const issuer = process.env.JWT_ISSUER;

        const payload = {
            id: userId
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: expiresAt,
            audience: audience,
            issuer: issuer
        })

        return token;
    }

    static async login(req: Request, res: Response): Promise<any>  {
        const body: LoginBody = req.body;

        const loginSchema = Joi.object({
            email: Joi.string().email().required().messages({
                'string.email': 'Um email válido é obrigatório',
                'any.required': 'O email é obrigatório'
            }),
            password: Joi.string().min(6).required().messages({
                'string.empty': 'A senha é obrigatória',
                'any.required': 'A senha é obrigatória'
            })
        });

        const { error } = loginSchema.validate(body);

        if (error) {
            return res.status(403).json({
                error: error.details[0].message
            });
        }

        const user = await User.findOne({
            where: {
                email: body.email
            }
        });

        if (!user) {
            return res.status(403).json({
                error: 'Senha/Email inválido ou não cadastrado!'
            });
        }

        const passwordValid = await bcrypt.compare(body.password, user.password);

        if (!passwordValid) {
            return res.status(403).json({
                error: 'Senha/Email inválido ou não cadastrado!'
            });
        }

        const client = getRedisClient();


        const token = await AuthController.generateToken(user.id, user.name);
        const refreshToken = await AuthController.generateRefreshToken(user.id);



        await client.set(`refreshToken:${user.id}`, refreshToken); // Expira em 30 dias

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            // secure: true, // HTTPS apenas
            sameSite: "strict", // Protege contra CSRF
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dias
        });

        return res.json({
            token
        });
    }

    static async refreshToken(req: Request, res: Response): Promise<any> {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token não fornecido' });
        }

        jwt.verify(refreshToken, process.env.JWT_SECRET, (err: any, decoded: any) => {
            if (err) {
                return res.status(403).json({ message: 'Refresh token inválido ou expirado' });
            }

            // Verifica o tempo restante do Refresh Token
            const currentTime = Math.floor(Date.now() / 1000);
            const expiresIn = decoded.expiresAt - currentTime;

            // Gera um novo Refresh Token se estiver próximo da expiração
            let newRefreshToken = refreshToken;
            if (expiresIn < 60 * 60 * 24) { // 1 dia
                newRefreshToken = this.generateRefreshToken(decoded.id);
            }

            // Gera um novo Access Token
            const newAccessToken = this.generateToken(decoded.id, decoded.name);

            return res.json({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
            });
        });
    }

    static async logout(req: AuthenticatedRequest, res: Response): Promise<void> {
        const redis = getRedisClient();

        await redis.del(`refreshToken:${req.user.id}`)

        res.status(200).send('ok');
    }
};