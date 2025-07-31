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

    console.log(id_client);

    // Tecnico data
    const [client_name, setClient_name] = useState("");
    const [email, setEmail] = useState("");
    const [phone_contato, setPhone_contato] = useState([])
    const [endereco_rua, setEndereco_rua] = useState("");
    const [endereco_bairro, setEndereco_bairro] = useState("");
    const [endereco_cidade, setEndereco_cidade] = useState("");
    const [endereco_uf, setEndereco_uf] = useState("");
    const [password, setPassword] = useState("");
    const [task, setTask] = useState("");
    const [doc_id, setDoc_id] = useState("");


    async function LoadClients() {
        try {
            const response = await api.get("/client/listar/" + id_client, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            if (response.data) {
                setClient_name(response.data.client_name);
                setEmail(response.data.email);
                setPhone_contato(response.data.phone_contato);
                setEndereco_rua(response.data.endereco_rua);
                setEndereco_bairro(response.data.endereco_bairro);
                setEndereco_cidade(response.data.endereco_cidade);
                setEndereco_uf(response.data.endereco_uf);
                setDoc_id(response.data.inep)
                setTask(response.data.tarefa)
            }
        } catch (error) {
            if (error.response?.data.error)
                console.log(error.response.data.error);
        }
    }

    async function SaveClient() {
        setMsg("");
        const json = {
            client_name,
            phone_contato,
            endereco_rua,
            endereco_bairro,
            endereco_cidade,
            endereco_uf,
            task,
            doc_id,
            email,
        }
        try {
            const response = await api.put("/client/" + id_client, json, {
                headers: { Authorization: `Bearer ${user.token}` }
            })

            if (response.data) {
                toast.success("Cliente atualizado com sucesso!")
                setTimeout(() => {
                    navigate("/appointments/clients");
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
        LoadClients();
    }, [])

    function ChangeStatus(e) {
        setTask(e.target.value);
    }
    const ufs = [
        { sigla: "AC", nome: "Acre" },
        { sigla: "AL", nome: "Alagoas" },
        { sigla: "AP", nome: "Amapá" },
        { sigla: "AM", nome: "Amazonas" },
        { sigla: "BA", nome: "Bahia" },
        { sigla: "CE", nome: "Ceará" },
        { sigla: "DF", nome: "Distrito Federal" },
        { sigla: "ES", nome: "Espírito Santo" },
        { sigla: "GO", nome: "Goiás" },
        { sigla: "MA", nome: "Maranhão" },
        { sigla: "MT", nome: "Mato Grosso" },
        { sigla: "MS", nome: "Mato Grosso do Sul" },
        { sigla: "MG", nome: "Minas Gerais" },
        { sigla: "PA", nome: "Pará" },
        { sigla: "PB", nome: "Paraíba" },
        { sigla: "PR", nome: "Paraná" },
        { sigla: "PE", nome: "Pernambuco" },
        { sigla: "PI", nome: "Piauí" },
        { sigla: "RJ", nome: "Rio de Janeiro" },
        { sigla: "RN", nome: "Rio Grande do Norte" },
        { sigla: "RS", nome: "Rio Grande do Sul" },
        { sigla: "RO", nome: "Rondônia" },
        { sigla: "RR", nome: "Roraima" },
        { sigla: "SC", nome: "Santa Catarina" },
        { sigla: "SP", nome: "São Paulo" },
        { sigla: "SE", nome: "Sergipe" },
        { sigla: "TO", nome: "Tocantins" },
    ];

    return (
        <>
            <div className="container-fluid mt-add">
                <ToastContainer
                    className='Toastify__toast-body'
                    autoClose={3000}
                    closeOnClick
                    position="top-center" />
                <Navbar />
                <div className="container-fluid col-10 mt-page">
                    <div className="row justify-content-between">
                        <div className="h1 col-5">
                            Editar Cliente
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row d-flex justify-content-center mb-1">
                        <div className="col-10 mx-auto ">
                            <section className="col-12 border bg-form my-2 px-2">
                                <div className="row card-title ps-4 py-2 h4 text-light">
                                    {client_name}
                                </div>
                                <div className="row px-2">
                                    <div className="row px-2 justify-content-between col-12 mx-auto">
                                        <div className="col-3">
                                            <dt className='p-2'>👤 Nome</dt>
                                            <input
                                                value={client_name}
                                                onChange={(e) => setClient_name(e.target.value)}
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
                                                value={phone_contato}
                                                onChange={(e) => setPhone_contato(e.target.value)}
                                                placeholder="Celular com ddd"
                                                type="text"
                                                className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row px-2 justify-content-between col-12 mx-auto">
                                    <div className="col-auto">
                                        <dt className='p-2'>👤 Endereço rua</dt>
                                        <input
                                            value={endereco_rua}
                                            onChange={(e) => setEndereco_rua(e.target.value)}
                                            placeholder="Endereço"
                                            type="text"
                                            className="form-control" />
                                    </div>
                                    <div className="col-auto">
                                        <dt className='p-2'>👤 Endereço bairro</dt>
                                        <input
                                            value={endereco_bairro}
                                            onChange={(e) => setEndereco_bairro(e.target.value)}
                                            placeholder="Endereço"
                                            type="text"
                                            className="form-control" />
                                    </div>
                                    <div className="col-auto">
                                        <dt className='p-2'>👤 Endereço cidade'</dt>
                                        <input
                                            value={endereco_cidade}
                                            onChange={(e) => setEndereco_cidade(e.target.value)}
                                            placeholder="Endereço"
                                            type="text"
                                            className="form-control" />
                                    </div>
                                    <div className="row px-2 justify-content-between col-12 mx-auto mb-3">
                                        <div className="col-auto">
                                            <dt className='p-2'>👤 Número do cadastro</dt>
                                            <input type="text" placeholder="Número do cliente"
                                                value={doc_id}
                                                className="form-control"
                                                onChange={(e) => setDoc_id(e.target.value)} required />
                                        </div>
                                        <div className="col-auto">
                                            <dt className='p-2'>👤 Endereço UF</dt>
                                            <select
                                                id="estado"
                                                className='form-control'
                                                value={endereco_uf}
                                                onChange={(e) => setEndereco_uf(e.target.value)}
                                            >
                                                <option value="">Selecione um estado</option>
                                                {ufs.map((uf) => (
                                                    <option key={uf.sigla} value={uf.sigla}>
                                                        {uf.nome}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-auto">
                                            <dt className='p-2'>👤 Status</dt>
                                            <select className='form-control' name="tecnico"
                                                value={task}
                                                id="tecnico" onChange={ChangeStatus}>
                                                <option value="">Escolha um status:</option>
                                                <option value={"Ativo"} >Ativo</option>
                                                <option value={"Inativo"} >Inativo</option>
                                            </select>
                                        </div>
                                        <div className="col-auto d-flex align-items-end justify-content-center mt-2">
                                            <button type="submit"
                                                onClick={SaveClient}
                                                className="btn button-send mb-1 btn-sm btn-primary">Salvar</button>
                                            <button type="button" onClick={() => navigate("/appointments/clients")} className="btn button-cancel mb-1 btn-sm btn-primary mx-2">Voltar</button>
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
