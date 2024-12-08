import { Field, Formik, Form as FormikForm, FormikHelpers} from "formik";
import { useEffect, useState } from "react";
import {
    Button,
    Card,
    Container,
    Row,
    Col,
    Form,
    Table
} from "react-bootstrap";
import api from "../services/api";
import { ToastrSuccess, ToastrError } from "../utils/toastr";
import ListChatbots from "../components/ChatbotComponents/ListChatbots";
import ChatbotForm from "../components/ChatbotComponents/ChatbotForm";

export interface Chatbot {
    id: string,
    name: string,
    behavior: string
}

function Chatbots() {
    const [chatbots, setChatbots] = useState<Chatbot[] | null>([]);
    const [openChatBotForm, setOpenChatBotForm] = useState(false);

    useEffect(() => {
        async function fetchChatbots() {
            const response = await api.get<Chatbot[]>('/chatbots');

            const fetchedChatbots = response.data

            console.log(fetchChatbots);

            setChatbots(fetchedChatbots);
        }

        fetchChatbots();
    }, [])

    function handleNewChatbotClick() {
        setOpenChatBotForm(true);
    }

    function handleCloseForm() {
        setOpenChatBotForm(false);
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12" className="mx-auto">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Listagem de chatbots</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                {openChatBotForm
                                    ? <ChatbotForm closeForm={handleCloseForm}/>
                                    : !chatbots ? 'Carregando....' : <ListChatbots onClickNewChatBot={handleNewChatbotClick} chatbots={chatbots}/>
                                }

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Chatbots;
