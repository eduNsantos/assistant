import React from "react";
import { Whatsapp } from "../../views/Whatsapps";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

interface ListWhatsapps {
    whatsapps: Whatsapp[],
    onClickNewWhatsapp: () => any
    onClickEditWhatsapp: (whatsappId: number|undefined) => any
}

export default function ListWhatsapps({
    whatsapps,
    onClickNewWhatsapp,
    onClickEditWhatsapp
}: ListWhatsapps): React.ReactNode {

    if (!whatsapps) {
        return <>Carregando...</>
    }


    if (whatsapps.length == 0) {
        return (
            <div className="text-center mt-4 pb-5">
                <h5>Nenhum <b>Whatsapp</b> cadastrado</h5>
                <Button  onClick={onClickNewWhatsapp} color="primary">Criar primeiro whatsapp</Button>
            </div>
        )
    }

    return (
        <>
            {whatsapps.map(whatsapp => {
                return (
                    <div key={whatsapp.id} className="border rounded  mb-2 px-3 py-4">
                        <div className="w-100 pb-3 border-bottom d-flex align-items-center justify-content-between">
                            <b>#{whatsapp.id} - {whatsapp.name}</b>
                            <Button onClick={() => onClickEditWhatsapp(whatsapp?.id)} size="sm" className="float-end" title="Editar">
                                <FontAwesomeIcon icon={faPencilAlt}/>
                            </Button>
                    </div>
                        <div className="border-top pt-2">
                            <small className="text-muted">{whatsapp.behavior.slice(0, 300)}{whatsapp.behavior.length > 300 ? '...' : ''}</small>
                        </div>
                    </div>
                )
            })}
        </>
    )
}