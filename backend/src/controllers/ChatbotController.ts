import { Request, Response } from "express";
import { Chatbot } from "../entity/ChatbotEntity";
import Joi from 'joi';
import bcrypt from 'bcrypt';
import { AuthenticatedRequest } from "../middleware/isAuthenticated";
import { ListChatBots } from "../services/ChatbotServices/ListChatBots";
import { CreateChatBot } from "../services/ChatbotServices/CreateChatBot";
import { ShowChatbot, ShowChatbotParams } from "../services/ChatbotServices/ShowChatbot";
import { UpdateChatbot } from "../services/ChatbotServices/UpdateChatbot";

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



export default class ChatbotController {
    static async index(req: AuthenticatedRequest, res: Response)  {
        const chatbots = await ListChatBots(req.user.id);

        res.json(chatbots);
    }


    static async store(req: AuthenticatedRequest, res: Response)  {
        const data: CreateChatBot = req.body;

        const chatbot = await CreateChatBot(data, req.user.id);

        res.json(chatbot);
    }

    static async show(req: AuthenticatedRequest, res: Response)  {
        const chatbotId: any = req.params.chatbotId;

        const chatbot = await ShowChatbot(chatbotId, req.user.id);

        res.json(chatbot);
    }

    static async update(req: AuthenticatedRequest, res: Response): Promise<any>  {
        const body: UpdateChatbot = req.body;

        const newChatbot = await UpdateChatbot(body, req.user.id)

        res.send(newChatbot);
    }
};