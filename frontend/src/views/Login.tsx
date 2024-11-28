import { Field, Formik, Form as FormikForm } from "formik";
import { useEffect, useLayoutEffect, useState } from "react";
import { Anchor, Button, Container, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import * as Yup from 'yup'
import FormikError from "../components/FormikErrors";
import api from "../services/api";
import { saveToken } from "../utils/token";
import { AxiosError } from "axios";
import * as toastr from 'toastr';

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Preencha um e-mail válido')
        .required('Obrigatório'),
    password: Yup.string()
        .min(6, 'Preencha ao menos 6 caracteres')
        .required('Obrigatório!'),
  });


function Login() {
    const [initialValues, setInitialValues] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    let { state } = useLocation();


    useLayoutEffect(() => {

        if (!!state?.email) {
            console.log(state.email)
            setInitialValues((prev) => ({
                ...prev,
                email: state.email
            }))

            navigate('.', { replace: true, state: {} });
        }
    }, [state]);
;

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={async (values, { setSubmitting }) => {
                interface Response {
                    token: string
                }

                interface Error {
                    error: string
                }

                try {
                    const { data } = await api.post<Response>('/auth/login', JSON.stringify(values));

                    if (data?.token) {
                        saveToken(data?.token);
                    }

                    toastr.success('Login autorizado!', 'Direcionando você para o acesso restrito....', {
                        timeOut: 2500,
                        progressBar: true
                    });

                    setTimeout(() => {

                        navigate('/admin/dashboard');
                    }, 2800);

                } catch (err: AxiosError | {}) {
                    if (err?.response?.data?.error) {
                        const data: Error = err.response.data;

                        toastr.error(data.error, 'Atenção!', {
                            progressBar: true,
                            timeOut: 4000
                        })
                    }
                } finally {
                    setSubmitting(false);
                }
            }}
            validationSchema={LoginSchema}
            validateOnChange={true}
            >
            {({isSubmitting, isValid}) => (
                <FormikForm>
                    <div className="col-5 mx-auto border rounded p-5">
                        <h2 className="text-center pb-4">Faça login</h2>
                        <Form.Group>
                            <Form.Label>E-mail</Form.Label>
                            <Field as={Form.Control} name="email" placeholder="jorge@gmail.com" type="email"/>
                            <FormikError name="email"/>
                        </Form.Group>
                        <Form.Group className="mt-4">
                            <Form.Label>Senha</Form.Label>
                            <Field as={Form.Control} name="password" placeholder="********" type="password"/>
                            <FormikError name="password"/>
                        </Form.Group>

                        <div className="mt-2 text-center">
                            <Form.Group className="mb-2">
                                <Button type="submit" disabled={isSubmitting} variant="primary"  className="w-100 btn-fill">Fazer Login</Button>
                            </Form.Group>

                            <Anchor disabled={isSubmitting} href="/forgot-passsword">Esqueci minha senha</Anchor><br/>
                            <Anchor disabled={isSubmitting} href="/register">Não tem uma conta? Cadastre-se</Anchor>
                        </div>
                    </div>
                </FormikForm>
            )}
        </Formik>
    )
}

export default Login;