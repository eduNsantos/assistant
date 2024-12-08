import React, { useEffect, useState } from "react";
import { Chatbot } from "../../views/Chatbots";
import { Button, Form, Row } from "react-bootstrap";
import { Form as FormikForm, Field, Formik, FormikHelpers } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import api from "../../services/api";

interface ChatbotFormInterface {
    chatbotId?: number,
    closeForm: () => void,
    onSubmit: (values: Partial<Chatbot>, helpers: FormikHelpers<any>) => Promise<void>
}


interface ChatbotValues {
    id?: number,
    name: string,
    behavior: string
}

export default function ChatbotForm({
    chatbotId,
    closeForm,
    onSubmit
}: ChatbotFormInterface): React.ReactNode {

    const [chatbot, setChatbot] = useState<Chatbot>({
        id: undefined,
        name: "",
        behavior: "",
    });


    useEffect(() => {
        async function fetchChatbot() {

            if (!!chatbotId) {
                const { data } = await api.get<ChatbotValues>(`chatbots/${chatbotId}`)

                setChatbot(data);
            }
        }

        fetchChatbot();
    }, [chatbotId])

    return (
        <>
            <div className="d-flex align-items-center">
                <Button size="sm" onClick={closeForm} className="me-3">
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </Button>

                {chatbot ? <span>Editando informações do chatbot <b>{chatbot.name}</b></span> : <></>}
            </div>

            <Formik
                initialValues={chatbot}
                onSubmit={onSubmit}
                enableReinitialize={true}
            >

                {({isSubmitting, isValid}) => (
                    <FormikForm className="my-5">
                        <Row>
                            <Form.Group>
                                <Form.Label>Nome do Chatbot</Form.Label>
                                <Field
                                    as={Form.Control}
                                    name="name"
                                    placeholder="Rodrigo - Assistente de Vendas"
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mt-2">
                            <Form.Group>
                                <Form.Label>Descreva o mais detalhamente possível, o comportamento do seu chatbot</Form.Label>
                                <Field
                                    as="textarea"
                                    name="behavior"
                                    className="form-control"
                                    placeholder="Rodrigo - Assistente de Vendas"
                                    style={{ height: '150px' }}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mt-2">
                            <Form.Group>
                                <Button type="submit" color="primary" disabled={isSubmitting}>
                                    {!chatbot
                                        ? 'Criar Chatbot'
                                        : 'Salvar alterações'
                                    }
                                </Button>
                            </Form.Group>
                        </Row>
                    </FormikForm>
                )}
            </Formik>
        </>
    )
}