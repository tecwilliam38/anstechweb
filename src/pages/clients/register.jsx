import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import Navbar from '../../components/navbar/index';
import { useAuth } from '../../context/authContext';
import "./style.css"
import { toast, ToastContainer } from 'react-toastify';


function RegisterClient() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [phoneContato, setPhoneContato] = useState([])
    const [clientName, setClientName] = useState("");
    const [email, setEmail] = useState("");
    const [enderecoRua, setEnderecoRua] = useState("");
    const [enderecoBairro, setEnderecoBairro] = useState("");
    const [enderecoCidade, setEnderecoCidade] = useState("");
    const [enderecoUf, setEnderecoUf] = useState("");
    const [password, setPassword] = useState("");
    const [task, setTask] = useState("");
    const [docId, setDocId] = useState("");
    const [msg, setMsg] = useState("");


    async function ClientRegister() {
        setMsg("");
        try {
            const response = await api.post("/client/register", {
                client_name: clientName,
                phone_contato: phoneContato,
                endereco_rua: enderecoRua,
                endereco_bairro: enderecoBairro,
                endereco_cidade: enderecoCidade,
                endereco_uf: enderecoUf,
                task: task,
                doc_id: docId,
                email: email,
                password: "123456",
            }, {
                headers: { Authorization: `Bearer ${user.token}` }
            })
            console.log("Entrou no try");
            if (response.data) {
                toast.success("Técnico cadastrado com sucesso!")
                setTimeout(() => {
                    navigate("/appointments");
                }, 3000);
            } else
                setMsg("Erro ao criar conta. Tente novamente mais tarde.");
        } catch (error) {
            console.log(error);

            if (error.response?.data.error)
                setMsg(error.response?.data.error);
            else
                setMsg("Erro ao criar conta. Tente novamente mais tarde.");
        }
    }

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
            <ToastContainer
                className="Toastify__toast-body"
                autoClose={3000}
                closeOnClick
                position="top-center"
            />
            <Navbar />
            <div className="container-fluid justify-content-center align-items-center mt-page">
                <div className="container-fluid topo-tecnicos">
                    <div className="row d-flex justify-content-center mb-1">
                        <div className="col-10 mx-auto ">
                            <section className="col-12 border bg-form my-2 ">
                                <h3 className='text-light p-2 card-title'>📄 Ficha de Cadastro de Clientes</h3>

                                <div className="row ps-4 py-2 h4 text-light">{clientName}</div>
                                <div className="row px-2">
                                    <div className="row px-2 justify-content-between col-12 mx-auto">
                                        <div className="col-auto">
                                            <dt className='p-2'>👤 Nome:</dt>
                                            <input
                                                type="text"
                                                name="escola"
                                                placeholder="Nome do Cliente"
                                                value={clientName}
                                                className="form-control"
                                                onChange={(e) => setClientName(e.targevalue)}
                                                required
                                            />
                                        </div>
                                        <div className="col-auto">
                                            <dt className='p-2'>👤 Email</dt>
                                            <input type="email" placeholder="E-mail"
                                                value={email}
                                                className="form-control"
                                                onChange={(e) => setEmail(e.targevalue)}
                                                required />
                                        </div>
                                        <div className="col-auto">
                                            <dt className='p-2'>👤 Celular</dt>
                                            <input
                                                type="tel"
                                                name="Celular"
                                                value={phoneContato}
                                                placeholder="Celular"
                                                className="form-control"
                                                onChange={(e) => setPhoneContato(e.targevalue)}
                                                required />
                                        </div>
                                    </div>
                                    <div className="row px-2 justify-content-between col-12 mx-auto">
                                        <div className="col-4">
                                            <dt className='p-2'>👤 Endereço rua</dt>
                                            <input type="text" placeholder="Digite o nome da rua e o número da empresa"
                                                value={enderecoRua}
                                                className="form-control"
                                                onChange={(e) => setEnderecoRua(e.targevalue)} required />
                                        </div>
                                        <div className="col-4">
                                            <dt className='p-2'>👤 Endereço bairro</dt>
                                            <input type="text" placeholder="Digite o bairro"
                                                value={enderecoBairro}
                                                className="form-control"
                                                onChange={(e) => setEnderecoBairro(e.targevalue)} required />
                                        </div>
                                        <div className="col-4">
                                            <dt className='p-2'>👤 Endereço cidade</dt>
                                            <input type="text" placeholder="Endereço"
                                                value={enderecoCidade}
                                                className="form-control"
                                                onChange={(e) => setEnderecoCidade(e.targevalue)} required />
                                        </div>
                                    </div>
                                    <div className="row px-2 justify-content-between col-12 mx-auto mb-3">
                                        <div className="col-auto">
                                            <dt className='p-2'>👤 Endereço UF</dt>
                                            <select
                                                id="estado"
                                                className='form-control'
                                                value={enderecoUf}
                                                onChange={(e) => setEnderecoUf(e.target.value)}
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
                                                id="tecnico" onChange={ChangeStatus}>
                                                <option value="">Escolha um status:</option>
                                                <option value={"Ativo"} >Ativo</option>
                                                <option value={"Inativo"} >Inativo</option>
                                            </select>

                                        </div>
                                        <div className="col-auto d-flex align-items-end justify-content-center">
                                            <button type="submit" onClick={ClientRegister} className="btn button-send mb-1 btn-sm btn-primary mx-2">Cadastrar</button>
                                            <button type="button" onClick={() => navigate("/appointments")} className="btn button-cancel mb-1 btn-sm btn-primary mx-2">Cancelar</button>
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

export default RegisterClient
