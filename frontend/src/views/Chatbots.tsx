import { FormikHelpers} from "formik";
import { useEffect, useState } from "react";
import {
    Card,
    Container,
    Row,
    Col,
    Button,
} from "react-bootstrap";
import api from "../services/api";
import ListChatbots from "../components/ChatbotComponents/ListChatbots";
import ChatbotForm from "../components/ChatbotComponents/ChatbotForm";
import { ToastrSuccess } from "../utils/toastr";

export interface Chatbot {
    id?: number,
    name: string,
    behavior: string
}

function Chatbots() {
    const [chatbots, setChatbots] = useState<Chatbot[]>([]);
    const [editChatbotId, setEditChatbotId] = useState<number>();

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

    async function handleCreateBot(values: Partial<Chatbot>, helpers: FormikHelpers<Chatbot>): Promise<void> {

        const { setSubmitting, resetForm }  = helpers;


        setSubmitting(true);

        const { data } = await api.post<Chatbot>('/chatbots', values);

        ToastrSuccess({
            body: 'Chatbot criado com sucesso!'
        });

        handleCloseForm();

        resetForm();

        setChatbots([...chatbots, data]);

        setSubmitting(false);
    }

    function onClickEditChatbot(chatbotId: number|undefined) {
        console.log(chatbotId);
        setOpenChatBotForm(true);
        setEditChatbotId(chatbotId);
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12" className="mx-auto">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">
                                    {openChatBotForm ? '' : (
                                        <div className="d-flex justify-content-between" color="green">
                                            Listagem de chatbots

                                            <Button size="sm" onClick={handleNewChatbotClick} color="primary">Novo Chatbot</Button>
                                        </div>
                                    )}
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                {openChatBotForm
                                    ? <ChatbotForm chatbotId={editChatbotId} onSubmit={handleCreateBot} closeForm={handleCloseForm}/>
                                    : !chatbots ? 'Carregando....' : <ListChatbots onClickEditChatbot={onClickEditChatbot} onClickNewChatBot={handleNewChatbotClick} chatbots={chatbots}/>
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
