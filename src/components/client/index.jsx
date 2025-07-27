import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext';
import api from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';


Client.propTypes = {
    client_name: PropTypes.string,
    endereco_rua: PropTypes.string,
    endereco_bairro: PropTypes.string,
    endereco_cidade: PropTypes.string,
    endereco_uf: PropTypes.string,
    phone_contato: PropTypes.string,
    email: PropTypes.string,
    status: PropTypes.string,
    docId: PropTypes.string,
    password: PropTypes.string,
    clickEdit: PropTypes.func,
    clickDelete: PropTypes.func,
    id_client: PropTypes.number,
}


function Client(props) {
    const navigate = useNavigate();
    const { user } = useAuth();
    // const { id_client } = useParams();



    return <>
        <section className="col-12 border bg-form my-2 px-2" key={props.id_client}>
            <div className="row card-title ps-4 py-2 h4 text-light">{props.nomeClient}</div>
            <div className="row justify-content-around">
                <div className="col-3">
                    <dt className='p-2'>👤 Email</dt>
                    <div className="border p-2">
                        {props.email}
                    </div>
                </div>
                <div className="col-auto">
                    <dt className='p-2'>👤 Endereço rua</dt>
                    <div className="border p-2">
                        {props.enderecoRua}
                    </div>
                </div>
                <div className="col-auto">
                    <dt className='p-2'>👤 Cidade</dt>
                    <div className="border p-2">
                        {props.enderecoCidade}
                    </div>
                </div>
                <div className="col-auto">
                    <dt className='p-2'>👤 Bairro</dt>
                    <div className="border p-2">
                        {props.enderecoBairro}
                    </div>
                </div>
                <div className="col-auto">
                    <dt className='p-2'>👤 UF</dt>
                    <div className="border p-2">
                        {props.enderecoUf}
                    </div>
                </div>
            </div>
            <div className="row justify-content-between pb-3">
                <div className="col-auto">
                    <dt className='p-2'>👤 Celular</dt>
                    <div className="border p-2">
                        {props.contato}
                    </div>
                </div>
                <div className="col-3">
                    <dt className='p-2'>👤 Registo nº</dt>
                    <div className="border p-2">
                        {props.docId}
                    </div>
                </div>
                <div className="col-auto">
                    <dt className='p-2'>👤 Status</dt>
                    <div className="border p-2">
                        {props.status}
                    </div>
                </div>
                <div className="col-3 d-flex align-items-end justify-content-end">
                    <div className="justify-content-around me-3">
                        <button onClick={() => props.ClickEdit(props.id_client)}
                            className="btn btn-sm btn-primary mx-2">
                            <i className="bi bi-pencil-square"></i>
                        </button>
                        <button onClick={() => props.ClickDelete(props.id_client)}
                            className="btn btn-sm btn-danger">
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </section >
    </>
}

export default Client;
