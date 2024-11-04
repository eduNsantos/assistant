import React from "react";
import { Anchor, Button, Container, Form } from "react-bootstrap";

function Login() {
    return (
        <Container>
            <div className="col-5 mx-auto border rounded p-5">
                <h2 className="text-center pb-4">Faça login</h2>
                <Form.Group>
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control type="email" placeholder="E-mail" />
                </Form.Group>
                <Form.Group className="mt-4">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="email" placeholder="Senha" />
                </Form.Group>

                <div className="mt-2 text-center">
                    <Form.Group className="mb-2">
                        <Button variant="primary"  className="w-100 btn-fill">Fazer Login</Button>
                    </Form.Group>

                    <Anchor href="/forgot-passsword">Esqueci minha senha</Anchor><br/>
                    <Anchor href="/register">Não tem uma conta? Cadastre-se</Anchor>
                </div>
            </div>
        </Container>
    )
}

export default Login;