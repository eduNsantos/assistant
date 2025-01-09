import React, { useEffect, useState } from "react";
import { Whatsapp } from "../../views/Whatsapps";
import { Button, Form, Row } from "react-bootstrap";
import { Form as FormikForm, Field, Formik, FormikHelpers } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import api from "../../services/api";

interface WhatsappFormInterface {
    whatsappId?: number,
    closeForm: () => void,
    onSubmit: (values: Partial<Whatsapp>, helpers: FormikHelpers<any>) => Promise<void>
}


interface WhatsappValues {
    id?: number,
    name: string,
    behavior: string
}

export default function WhatsappForm({
    whatsappId,
    closeForm,
    onSubmit
}: WhatsappFormInterface): React.ReactNode {

    const [whatsapp, setWhatsapp] = useState<Whatsapp>({
        id: undefined,
        name: "",
        behavior: "",
    });


    useEffect(() => {
        async function fetchWhatsapp() {

            if (!!whatsappId) {
                const { data } = await api.get<WhatsappValues>(`whatsapps/${whatsappId}`)

                setWhatsapp(data);
            }
        }

        fetchWhatsapp();
    }, [whatsappId])

    return (
        <>
            <div className="d-flex align-items-center">
                <Button size="sm" onClick={closeForm} className="me-3">
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </Button>

                {whatsappId ? <span>Editando informações do whatsapp <b>{whatsapp.name}</b></span> : <>Cadastrar novo whatsapp</>}
            </div>

            <Formik
                initialValues={whatsapp}
                onSubmit={onSubmit}
                enableReinitialize={true}
            >

                {({isSubmitting, isValid, values}) => (
                    <FormikForm className="my-3">
                        <Row>
                            <Form.Group>
                                <Form.Label>Nome do Whatsapp</Form.Label>
                                <Field
                                    as={Form.Control}
                                    name="name"
                                    placeholder="Rodrigo - Assistente de Vendas"
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mt-2">
                            <Form.Group>
                                <Form.Label>Descreva o mais detalhamente possível, o comportamento do seu whatsapp</Form.Label>
                                <Field
                                    as="textarea"
                                    name="behavior"
                                    className="form-control"
                                    placeholder="Rodrigo - Assistente de Vendas"
                                    style={{ height: '150px' }}
                                />
                            </Form.Group>
                            <br/>
                            <small className="my-2 text-muted">{values.behavior.length} caracteres</small>
                        </Row>
                        <Row className="mt-2">
                            <Form.Group>
                                <Button type="submit" color="primary" disabled={isSubmitting}>
                                    {!whatsapp
                                        ? 'Criar Whatsapp'
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