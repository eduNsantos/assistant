import { Request, Response } from "express";
import { User } from "../entity/UserEntity";
import Joi from 'joi';
import bcrypt from 'bcrypt';
import { AuthenticatedRequest } from "../middleware/isAuthenticated";

const userStoreSchema = Joi.object({
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
    confirmationPassword: Joi.string().valid(Joi.ref('password')).messages({
        'any.only': 'A confirmação da senha deve corresponder à senha',
        'any.required': 'A confirmação da senha é obrigatória'
    })
});

const userUpdateSchema = Joi.object({
    name: Joi.string().min(1).required().messages({
        'string.empty': 'O nome é obrigatório',
        'any.required': 'O nome é obrigatório'
    }),
    password: Joi.string().optional().allow("").min(6).messages({
        'string.empty': 'A senha não pode estar vazia',
        'string.min': 'A senha deve ter pelo menos 6 caracteres',
    }),
    confirmationPassword: Joi.string().when('password', {
        is: Joi.not(""),
        then: Joi.required().equal(Joi.ref('password')).messages({
            'any.only': 'A confirmação de senha deve igual a senha'
        }),
        otherwise: Joi.allow("")
    })
});
interface StoreBody {
    name: string,
    email: string,
    password: string,
    confirmationPassword: string
}

interface UpdateBody {
    name: string,
    password: string,
    confirmationPassword: string
}


export default class UserController {
    static async index(req: AuthenticatedRequest, res: Response)  {
        const repository = User.getRepository();

        const user = await repository.findOne({
            where: {
                id: req.user?.id
            },
            select: ['name', 'email']
        });

        res.json(user);
    }

    static async store(req: Request, res: Response): Promise<any>  {
        try {
            const body: StoreBody = req.body;


            const { error } = userStoreSchema.validate(body, {
                abortEarly: false
            });



            if (error) {
                let errors = {};
                error.details.forEach(err => {
                    console.log
                    errors[err.path.join('.')] = err.message
                })

                return res.status(400).json(errors);
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

            return res.json({
                userId: result.id
            });
        } catch (err) {

            if (err.code ===  '23505') {
                return res.status(400).send('USER_MAY_BE_REGISTERED');
            }

            console.log(err);
            res.status(400);
        }
    }

    static async update(req: AuthenticatedRequest, res: Response): Promise<any>  {
        try {
            const body: UpdateBody = req.body;


            const { error } = userUpdateSchema.validate(body);

            if (error) {
                res.status(400).json({
                    error: error.details[0].message
                });
                return;
            }

            const user = new User();

            user.name = body.name;

            if (!!body.password) {
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(body.password, saltRounds);

                user.password = hashedPassword;
            }

            const result = await User.getRepository().update({
                id: req.user.id,
            }, user)

            res.status(200) .send('ok');

            return;
        } catch (err) {

            console.log(err);
            res.status(400);
        }
    }
};