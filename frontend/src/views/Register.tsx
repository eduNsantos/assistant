import React from "react";
import { Anchor, Button, Container, Form } from "react-bootstrap";

function Register() {
    return (
        <Container>
            <div className="col-5 mx-auto border rounded p-5">
                <h2 className="text-center pb-4">Cadastre-se</h2>
                <Form.Group>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" placeholder="Ex.: Joaquin Phoenix" />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control type="email" placeholder="Ex.:joaquim.phoenix@gmail.com"/>
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" placeholder="Senha" />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Confirmação de Senha</Form.Label>
                    <Form.Control type="password" placeholder="Senha" />
                </Form.Group>

                <div className="mt-2 text-center">
                    <Form.Group className="mb-2">
                        <Button variant="primary"  className="w-100 btn-fill">Confirmar o cadastro</Button>
                    </Form.Group>
                </div>
            </div>
        </Container>
    )
}

export default Register;