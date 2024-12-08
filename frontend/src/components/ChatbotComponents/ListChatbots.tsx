import React from "react";
import { Chatbot } from "../../views/Chatbots";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

interface ListChatbots {
    chatbots: Chatbot[],
    onClickNewChatBot: () => any
onClickEditChatbot: (chatbotId: number|undefined) => any
}

export default function ListChatbots({
    chatbots,
    onClickNewChatBot,
    onClickEditChatbot
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
                    <div key={chatbot.id} className="border rounded  mb-2 px-3 py-4">
                        <div className="w-100 pb-3 border-bottom d-flex align-items-center justify-content-between">
                            <b>#{chatbot.id} - {chatbot.name}</b>
                            <Button onClick={() => onClickEditChatbot(chatbot?.id)} size="sm" className="float-end" title="Editar">
                                <FontAwesomeIcon icon={faPencilAlt}/>
                            </Button>
                    </div>
                        <div className="border-top pt-2">
                            <small className="text-muted">{chatbot.behavior}</small>
                        </div>
                    </div>
                )
            })}
        </>
    )
}