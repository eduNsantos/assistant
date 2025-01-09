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
import ListWhatsapps from "../components/WhatsappComponents/ListWhatsapps";
import WhatsappForm from "../components/WhatsappComponents/WhatsappForm";
import { ToastrSuccess } from "../utils/toastr";

export interface Whatsapp {
    id?: number,
    name: string,
    behavior: string
}

function Whatsapps() {
    const [whatsapps, setWhatsapps] = useState<Whatsapp[]>([]);
    const [editWhatsappId, setEditWhatsappId] = useState<number>();

    const [openWhatsappForm, setOpenWhatsappForm] = useState(false);

    useEffect(() => {
        async function fetchWhatsapps() {
            const response = await api.get<Whatsapp[]>('/whatsapps');

            const fetchedWhatsapps = response.data

            setWhatsapps(fetchedWhatsapps);
        }

        fetchWhatsapps();
    }, [])

    function handleNewWhatsappClick() {
        setOpenWhatsappForm(true);
    }

    function handleCloseForm() {
        setOpenWhatsappForm(false);
        setEditWhatsappId(undefined);
    }

    useEffect(() => {
        console.log(whatsapps);
    }, [whatsapps])

    async function handleWhatsappSubmit(values: Partial<Whatsapp>, helpers: FormikHelpers<Whatsapp>): Promise<void> {

        const { setSubmitting, resetForm }  = helpers;


        setSubmitting(true);

        let data: Whatsapp;


        if (!editWhatsappId) {
            let response = await api.post<Whatsapp>('/whatsapps', values)
            data = response.data;

            setWhatsapps([...whatsapps, data]);

            ToastrSuccess({
                body: 'Whatsapp criado com sucesso!'
            });
            handleCloseForm();

            resetForm();
        } else {
            let response = await api.put<Whatsapp>(`/whatsapps/${editWhatsappId}`, values)

            ToastrSuccess({
                body: 'Whatsapp Alterado!'
            });

            data = response.data;


            const newValues = [...whatsapps];
            for (let i = 0; i < whatsapps.length; i++) {
                let whatsapp = whatsapps[i];

                if (data.id === whatsapp.id) {
                    newValues[i] = data;

                    setWhatsapps(newValues)
                    break;
                }
            }

        }


        setSubmitting(false);
    }

    function onClickEditWhatsapp(whatsappId: number|undefined) {
        console.log(whatsappId);
        setOpenWhatsappForm(true);
        setEditWhatsappId(whatsappId);
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12" className="mx-auto">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">
                                    {openWhatsappForm ? '' : (
                                        <div className="d-flex justify-content-between" color="green">
                                            Listagem de whatsapps

                                            <Button size="sm" onClick={handleNewWhatsappClick} color="primary">Novo Whatsapp</Button>
                                        </div>
                                    )}
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                {openWhatsappForm
                                    ? <WhatsappForm whatsappId={editWhatsappId} onSubmit={handleWhatsappSubmit} closeForm={handleCloseForm}/>
                                    : !whatsapps ? 'Carregando....' : <ListWhatsapps onClickEditWhatsapp={onClickEditWhatsapp} onClickNewWhatsapp={handleNewWhatsappClick} whatsapps={whatsapps}/>
                                }

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Whatsapps;
