import { Request, Response } from "express";
import { User } from "../entity/UserEntity";
import Joi from 'joi';
import bcrypt from 'bcrypt';

const userSchema = Joi.object({
    name: Joi.string().min(1).required().messages({
        'string.empty': 'O nome é obrigatório',
        'any.required': 'O nome é obrigatório'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Um email válido é obrigatório',
        'any.required': 'O email é obrigatório'
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'A senha é obrigatória',
        'string.min': 'A senha deve ter pelo menos 6 caracteres',
        'any.required': 'A senha é obrigatória'
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'A confirmação da senha deve corresponder à senha',
        'any.required': 'A confirmação da senha é obrigatória'
    })
});

interface StoreBody {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

export default class UserController {
    static async index(req: Request, res: Response)  {
        const repository = User.getRepository();

        const users = await repository.find();

        res.json(users);
    }

    static async store(req: Request, res: Response): Promise<any>  {
        try {
            const body: StoreBody = req.body;

            const { error } = userSchema.validate(body);

            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const user = new User();

            user.name = body.name;
            user.email = body.email;

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(body.password, saltRounds);

            user.password = hashedPassword;

            const result = await user.save({
                data: body
            });

            return res.send(result.id);
        } catch (err) {

            if (err.code === '23505') {
                return res.status(400).send('USER_MAY_BE_REGISTERED');
            }

            console.log(err);
            res.status(400);
        }
    }
};