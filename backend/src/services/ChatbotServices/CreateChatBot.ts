import Joi from "joi";
import { Chatbot } from "../../entity/ChatbotEntity";

export interface CreateChatBot {
    name: string,
    behavior: string
}
// const validationStoreSchema = Joi.
export async function CreateChatBot(values: CreateChatBot, userId: number): Promise<Chatbot> {
    if (!values.name) {
        throw Error('CHATBOT_NOT_DEFINED');
    }


    const chatbot = new Chatbot();

    chatbot.name = values.name;
    chatbot.behavior = values.behavior;
    chatbot.userId = userId;

    return chatbot.save();
}