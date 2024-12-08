import { Chatbot } from "../../entity/ChatbotEntity";

export async function ListChatBots(userId: number): Promise<Chatbot[]> {

    const repository = Chatbot.getRepository();

    const chatbots = await repository.find({
        where: {
            userId
        },
        select: ['id', 'name', 'behavior']
    });

    return chatbots;
}