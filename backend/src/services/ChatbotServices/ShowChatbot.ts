import Joi, { number } from "joi";
import { Chatbot } from "../../entity/ChatbotEntity";

export interface ShowChatbotParams {
    chatbotId: number
}

export async function ShowChatbot(chatbotId: number, userId: number): Promise<Chatbot> {
    const repository = Chatbot.getRepository();

    const chatbot = await repository.findOne({
        where: {
            id: chatbotId,
            userId
        }
    });

    return chatbot;
}