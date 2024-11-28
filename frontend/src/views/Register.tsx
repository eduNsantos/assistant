import { Field, Formik, Form as FormikForm, FormikHelpers } from "formik";
import { Button, Form } from "react-bootstrap";
import * as Yup from 'yup';
import FormikError from "../components/FormikErrors";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import api from "../services/api";
import { useNavigate } from "react-router";
import * as toastr from 'toastr';
import { useEffect } from "react";
import { AxiosError } from "axios";

const RegisterSchema = Yup.object().shape({
    name: Yup.string()
        .min(6, 'Preencha o nome completo')
        .required('Obrigatório'),
    email: Yup.string()
        .email("Deve ser um e-mail")
        .min(10, 'Preencha um email va´ldio!')
        .required('Obrigatório'),
    password: Yup.string()
        .min(6, 'Preencha ao menos 6 caracteres')
        .required(),
    confirmationPassword: Yup.string()
        .min(6, 'Preencha ao menos 6 caracteres')
        .oneOf([Yup.ref('password')], 'As senhas não conferem')
        .required()
  });


interface Values {
    name: string,
    email: string,
    password: string,
    confirmationPassword: string
}

function Register() {
    const navigate = useNavigate();

    useEffect(() => {

        let timeout = 1000;

        toastr.success('Você será direcionado para fazer login...', 'Usuário cadastrado!', {
            timeOut: timeout,
            progressBar: true
        });

        setTimeout(() => navigate('/login', {
            state: {
                email: 'edu.nascimento22@outlook.com'
            }
        }), timeout + 300);

    }, [])

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                password: '',
                confirmationPassword: ''
            }}
            validationSchema={RegisterSchema}
            onSubmit={async (values, { setSubmitting }: FormikHelpers<Values>) => {
                try {
                    await api.post('/user', JSON.stringify(values));

                    let timeout = 3000;

                    toastr.success('Você será direcionado para fazer login...', 'Usuário cadastrado!', {
                        timeOut: timeout,
                        progressBar: true
                    });

                    setTimeout(() => navigate('/login', {
                        state: {
                            email: values.email
                        }
                    }), timeout + 300);
                } catch (err: AxiosError | {}) {

                    console.log(err?.response?.data?.errro);

                    console.log(err);
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({isSubmitting, isValid}) => (

                <FormikForm>
                    <div className="col-5 mx-auto border rounded p-5">
                        <h2 className="text-center pb-4">Cadastre-se</h2>
                        <Form.Group>
                            <Form.Label>Nome</Form.Label>
                            <Field as={Form.Control} name="name" placeholder="Ex.: Joaquin Phoenix"/>
                            <FormikError name="name"/>
                            {/* <ErrorMessage className="text-danger" name="name"/> */}
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>E-mail</Form.Label>
                            <Field type="email" as={Form.Control}  name="email" placeholder="Ex.:joaquim.phoenix@gmail.com"/>
                            <FormikError name="email"/>
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Senha</Form.Label>
                            <Field type="password" as={Form.Control}  name="password" placeholder="********" />
                            <FormikError name="password"/>
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Confirmação de Senha</Form.Label>
                            <Field  type="password" as={Form.Control}  name="confirmationPassword" placeholder="********" />
                            <FormikError name="confirmationPassword"/>
                        </Form.Group>

                        <div className="mt-2 text-center">
                            <Form.Group className="mb-2">
                                <Button disabled={isSubmitting} type="submit" variant="primary" className="w-100 btn-fill">
                                    {isSubmitting ?
                                        <FontAwesomeIcon icon={faSpinner} spin={true}/> :
                                        `Criar conta`}
                                </Button>
                            </Form.Group>
                        </div>
                    </div>
                </FormikForm>
            )}
        </Formik>
    )
}

export default Register;