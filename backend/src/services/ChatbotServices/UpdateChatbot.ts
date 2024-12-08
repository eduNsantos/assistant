import Joi from "joi";
import { Chatbot } from "../../entity/ChatbotEntity";

export interface UpdateChatbot {
    id: number,
    name: string,
    behavior: string
}
// const validationStoreSchema = Joi.
export async function UpdateChatbot(values: UpdateChatbot, userId: number): Promise<Chatbot> {
    const chatbot = await Chatbot.getRepository().findOne({
        where: {
            id: values.id,
            userId: userId
        }
    });

    chatbot.name = values.name;
    chatbot.behavior = values.behavior;

    return chatbot.save();
}