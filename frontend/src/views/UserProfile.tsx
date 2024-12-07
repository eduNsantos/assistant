import { Field, Formik, Form as FormikForm, FormikHelpers} from "formik";
import { useEffect, useState } from "react";
import {
    Button,
    Card,
    Container,
    Row,
    Col,
    Form
} from "react-bootstrap";
import api from "../services/api";
import { ToastrSuccess, ToastrError } from "../utils/toastr";

interface User {
    name: string;
    email: string;
    password: string,
    confirmationPassword: string,
}

function User() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function fetchUser() {
            const response = await api.get<User>('/user');

            const fetchedUser = response.data

            setUser(fetchedUser);
        }

        fetchUser();
    }, [])

    async function handleFormSubmit(values: User, FormikHelpers: FormikHelpers<User>) {
        const { setFieldValue } = FormikHelpers;

        try {
            await api.put('/user', {
                name: values.name,
                password: values.password,
                confirmationPassword: values.confirmationPassword
            });

            ToastrSuccess({
                body: 'Atualizações salvas com sucesso!'
            });

            setFieldValue('password', '');
            setFieldValue('confirmationPassword', '');
        } catch (err: any) {

            ToastrError({
                body: err?.response?.data?.error || 'Ocorreu um erro inesperado ao atualizar dados'
            })
        }
    }

    if (!user) {
        return <div>Carregando...</div>;  // Exibe um carregamento enquanto os dados são obtidos
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="8" className="mx-auto">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Editar Perfil</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Formik
                                    initialValues={{
                                        name: user?.name,
                                        email: user?.email,
                                        password: "",
                                        confirmationPassword: ""
                                    }}
                                    onSubmit={(handleFormSubmit)}
                                >
                                    {({isSubmitting}) => (

                                        <FormikForm>
                                            <Row>
                                                <Col className="pl-1" md="4">
                                                    <Form.Group>
                                                        <label htmlFor="exampleInputEmail1">
                                                            Email
                                                        </label>
                                                        <Field
                                                            as={Form.Control}
                                                            placeholder="Email"
                                                            type="email"
                                                            name="email"
                                                            disabled={true}
                                                        ></Field>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="px-1" md="6">
                                                    <Form.Group>
                                                        <label>Nome</label>
                                                        <Field
                                                            as={Form.Control}
                                                            placeholder="Jorge Malaquias"
                                                            type="text"
                                                            name="name"
                                                        ></Field>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md="6">
                                                    <Form.Group>
                                                        <label>Senha</label>
                                                        <Field
                                                            as={Form.Control}
                                                            type="password"
                                                            name="password"
                                                        ></Field>
                                                    </Form.Group>
                                                </Col>

                                                <Col md="6">
                                                    <Form.Group>
                                                        <label>Confirmação de senha</label>
                                                        <Field
                                                            as={Form.Control}
                                                            type="password"
                                                            name="confirmationPassword"
                                                        ></Field>
                                                    </Form.Group>
                                                </Col>


                                            </Row>

                                            <Button
                                                className="btn-fill pull-right"
                                                type="submit"
                                                variant="info"
                                                disabled={isSubmitting}
                                            >
                                                Atualizar
                                            </Button>
                                            <div className="clearfix"></div>
                                        </FormikForm>
                                    )}
                                </Formik>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default User;
