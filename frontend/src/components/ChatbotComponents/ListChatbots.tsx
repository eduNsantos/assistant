import React from "react";
import { Chatbot } from "../../views/Chatbots";
import { Button } from "react-bootstrap";

interface ListChatbots {
    chatbots: Chatbot[],
    onClickNewChatBot: () => any
}

export default function ListChatbots({
    chatbots,
    onClickNewChatBot
}: ListChatbots): React.ReactNode {

    if (!chatbots) {
        return <>Carregando...</>
    }


    if (chatbots.length == 0) {
        return (
            <div className="text-center mt-4 pb-5">
                <h5>Nenhum <b>Chatbot</b> cadastrado</h5>
                <Button  onClick={onClickNewChatBot} color="primary">Criar primeiro chatbot</Button>
            </div>
        )
    }

    return (
        <>
            {chatbots.map(chatbot => {
                return (
                    <div className="border rounded shadow mb-2">
                        {chatbot.name}
                        <br/>
                        <small className="text-muted">{chatbot.behavior}</small>
                    </div>
                )
            })}
        </>
    )
}