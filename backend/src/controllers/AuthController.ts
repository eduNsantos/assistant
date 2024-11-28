import { Request, Response } from "express";
import { User } from "../entity/UserEntity";
import Joi from 'joi';
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

interface LoginBody {
    email: string,
    password: string
}

export default class UserController {
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

        const passwordValid = await bcrypt.compare(body.password, user.password);

        if (!passwordValid) {
            return res.status(403).json({
                error: 'Senha/Email inválido ou não cadastrado!'
            });
        }

        const issuedAt = Math.floor(Date.now() / 1000);
        const expiresAt = issuedAt + 60 * 60;
        const audience = process.env.JWT_AUDIENCE;
        const issuer = process.env.JWT_ISSUER;

        const payload = {
            sub: user.id,
            iat: issuedAt,
            expiresAt: expiresAt,
            audience: audience,
            issuer: issuer
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET)

        return res.json({
            token
        });
    }

};