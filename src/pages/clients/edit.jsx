import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import './style.css'
import api from '../../api/api';

// css do confirm alert
import 'react-confirm-alert/src/react-confirm-alert.css';
import './style.css'
import { toast, ToastContainer } from 'react-toastify';

function ClientEditComponent() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { id_client } = useParams();

    const [msg, setMsg] = useState("");


    // Tecnico data
    const [email, setEmail] = useState("");
    const [idClient, setIdClient] = useState("");
    const [services, setServices] = useState([])
    const [clientName, setClientName] = useState("");
    const [enderecoRua, setEnderecoRua] = useState("");
    const [enderecoBairro, setEnderecoBairro] = useState("");
    const [enderecoCidade, setEnderecoCidade] = useState("");
    const [enderecoUf, setEnderecoUf] = useState("");
    const [password, setPassword] = useState("");
    const [task, setTask] = useState("");
    const [docId, setDocId] = useState("");

    async function LoadTecnicos() {
        try {
            const response = await api.get("/tecnicos/listar/" + id_tecnico, {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            if (response.data) {
                setClientName(response.data.client_name);
                setEmail(response.data.email);
                setPhoneContato(response.data.phone_contato);
                setEnderecoRua(response.data.endereco_rua);
                setEnderecoBairro(response.data.endereco_bairro);
                setEnderecoCidade(response.data.endereco_cidade);
                setEnderecoUf(response.data.endereco_uf);
                setSkill(response.data.skill)
            }
        } catch (error) {
            if (error.response?.data.error)
                console.log(error.response.data.error);
        }
    }

    async function SaveTecnico() {
        setMsg("");
        const json = {
            name: name,
            endereco: endereco,
            cel_phone: cel_phone,
            email: email
        }
        try {
            const response = await api.put("/tecnicos/" + id_tecnico, json, {
                headers: { Authorization: `Bearer ${user.token}` }
            })

            if (response.data) {
                toast.success("Tecnico atualizado com sucesso!")
                setTimeout(() => {
                    navigate("/appointments/tecnicos");
                }, 3000);
            }
        } catch (error) {
            console.log(error.data);
            if (error.response?.data.error) {
                if (error.response.status == 401)
                    alert("erro 401");
                return navigate("/");

                alert(error.response?.data.error);
            }
            else
                alert("Erro ao salvar dados");
            console.log(error);

        }
    }

    useEffect(() => {
        LoadTecnicos();
    }, [])

    return (
        <>
            <div className="container-fluid mt-add">
                <ToastContainer
                    className='Toastify__toast-body'
                    autoClose={3000}
                    closeOnClick
                    position="top-center" />
                <Navbar />
                <div className="container-fluid topo-tecnicos">
                    <div className="row d-flex justify-content-center mb-1">
                        <div className="col-10 mx-auto ">
                            <section className="col-12 border bg-form my-2 px-2">
                                <div className="row card-title ps-4 py-2 h4 text-light">
                                    {name}
                                </div>
                                <div className="row">
                                    <div className="col-3">
                                        <dt className='p-2'>👤 Nome</dt>
                                        <input
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Nome do Usuário"
                                            type="text"
                                            className="form-control" />
                                    </div>
                                    <div className="col-3">
                                        <dt className='p-2'>👤 Email</dt>
                                        <input
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email"
                                            type="text"
                                            className="form-control" />
                                    </div>
                                    <div className="col-3">
                                        <dt className='p-2'>👤 Celular</dt>
                                        <input
                                            value={cel_phone}
                                            onChange={(e) => setCel_phone(e.target.value)}
                                            placeholder="Celular com ddd"
                                            type="text"
                                            className="form-control" />
                                    </div>
                                </div>
                                <div className="row justify-content-between pb-3">
                                    <div className="col-6">
                                        <dt className='p-2'>👤 Endereço</dt>
                                        <input
                                            value={endereco}
                                            onChange={(e) => setEndereco(e.target.value)}
                                            placeholder="Endereço"
                                            type="text"
                                            className="form-control" />
                                    </div>
                                    <div className="col-3">
                                        <dt className='p-2'>👤 Função</dt>
                                        <input
                                            value={skill ?? ""}
                                            // onChange={(e) => setTecnicos({ ...tecnicos, skill: e.target.value })}
                                            placeholder="Endereço"
                                            type="text"
                                            className="form-control" />
                                    </div>

                                    <div className="col-3 d-flex align-items-end justify-content-end">
                                        <div className="justify-content-around me-3">
                                            <button onClick={SaveTecnico}
                                                className="btn button-send mb-1 btn-sm btn-primary mx-2">
                                                Salvar
                                                <i className="mx-1 bi bi-check-square-fill"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section >
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}

export default ClientEditComponent
