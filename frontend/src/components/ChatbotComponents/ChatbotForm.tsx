import React from "react";
import { Chatbot } from "../../views/Chatbots";
import { Button, Form, Row } from "react-bootstrap";
import { Field, Formik, FormikHelpers } from "formik";
import { ToastrError, ToastrSuccess } from "../../utils/toastr";
import api from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface ChatbotForm {
    chatbot?: Chatbot,
    closeForm: () => void
}

export default function ChatbotForm({
    chatbot,
    closeForm
}: ChatbotForm): React.ReactNode {


    // async function handleFormSubmit(values: Chatbot, FormikHelpers: FormikHelpers<Chatbot>) {
    //     try {
    //         await api.post('/chatbot', {
    //             name: values.name,
    //             behavior: values.behavior
    //         });

    //         ToastrSuccess({
    //             body: 'Atualizações salvas com sucesso!'
    //         });
    //     } catch (err: any) {

    //         ToastrError({
    //             body: err?.response?.data?.error || 'Ocorreu um erro inesperado ao atualizar dados'
    //         })
    //     }
    // }

    // if (!chatbot) {
    //     return <>Carregando...</>
    // }

    return (
        <>
            <Button onClick={closeForm}>
                <FontAwesomeIcon icon={faArrowLeft}/>
                Voltar
            </Button>

            <Formik
                initialValues={{
                    name: "",
                    behavior: ""
                }}

                onSubmit={async (values, { setSubmitting }) => {

                    setSubmitting(false);
                }}
            >
                <Form>
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
                            <Button color="primary">Criar Chatbot</Button>
                        </Form.Group>
                    </Row>
                </Form>
            </Formik>
        </>
    )
}