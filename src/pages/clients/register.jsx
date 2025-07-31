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
    const [msg, setMsg] = useState("");



    async function ClientRegister() {
        setMsg("");
        try {
            const response = await api.post("/client/register", {
                client_name,
                phone_contato,
                endereco_rua,
                endereco_bairro,
                endereco_cidade,
                endereco_uf,
                task,
                doc_id,
                email,
                password: "123456",
            }, {
                headers: { Authorization: `Bearer ${user.token}` }
            })
            if (response?.data) {
                toast.success("Cliente cadastrado com sucesso!")
                setTimeout(() => {
                    navigate("/appointments/clients");
                }, 2000);
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

    const municipiosRJ = [
        "Angra dos Reis", "Aperibé", "Araruama", "Areal", "Armação dos Búzios", "Arraial do Cabo",
        "Barra do Piraí", "Barra Mansa", "Belford Roxo", "Bom Jardim", "Bom Jesus do Itabapoana",
        "Cabo Frio", "Cachoeiras de Macacu", "Cambuci", "Campos dos Goytacazes", "Cantagalo",
        "Carapebus", "Cardoso Moreira", "Carmo", "Casimiro de Abreu", "Comendador Levy Gasparian",
        "Conceição de Macabu", "Cordeiro", "Duas Barras", "Duque de Caxias", "Engenheiro Paulo de Frontin",
        "Guapimirim", "Iguaba Grande", "Itaboraí", "Itaguaí", "Italva", "Itaocara", "Itaperuna",
        "Itatiaia", "Japeri", "Laje do Muriaé", "Macaé", "Macuco", "Magé", "Mangaratiba", "Maricá",
        "Mendes", "Mesquita", "Miguel Pereira", "Miracema", "Natividade", "Nilópolis", "Niterói",
        "Nova Friburgo", "Nova Iguaçu", "Paracambi", "Paraíba do Sul", "Paraty", "Paty do Alferes",
        "Petrópolis", "Pinheiral", "Piraí", "Porciúncula", "Porto Real", "Quatis", "Queimados",
        "Quissamã", "Resende", "Rio Bonito", "Rio Claro", "Rio das Flores", "Rio das Ostras",
        "Rio de Janeiro", "Santa Maria Madalena", "Santo Antônio de Pádua", "São Fidélis",
        "São Francisco de Itabapoana", "São Gonçalo", "São João da Barra", "São João de Meriti",
        "São José de Ubá", "São José do Vale do Rio Preto", "São Pedro da Aldeia", "São Sebastião do Alto",
        "Sapucaia", "Saquarema", "Seropédica", "Silva Jardim", "Sumidouro", "Tanguá", "Teresópolis",
        "Trajano de Moraes", "Três Rios", "Valença", "Varre-Sai", "Vassouras", "Volta Redonda"
    ];

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
                        <div className="col-10 mx-auto mt-2">
                            <section className="col-12 border bg-form my-2 ">
                                <h3 className='text-light p-2 card-title'>📄 Ficha de Cadastro de Clientes</h3>
                                <div className="row ps-4 py-2 h4 text-light">{client_name}</div>
                                <div className="row px-2">
                                    <div className="row px-2 justify-content-between col-12 mx-auto">
                                        <div className="col-auto">
                                            <dt className='p-2'>👤 Nome:</dt>
                                            <input
                                                type="text"
                                                name="escola"
                                                placeholder="Nome do Cliente"
                                                value={client_name}
                                                className="form-control"
                                                onChange={(e) => setClient_name(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-auto">
                                            <dt className='p-2'>👤 Email</dt>
                                            <input type="email" placeholder="E-mail"
                                                value={email}
                                                className="form-control"
                                                onChange={(e) => setEmail(e.target.value)}
                                                required />
                                        </div>
                                        <div className="col-auto">
                                            <dt className='p-2'>👤 Contato</dt>
                                            <input
                                                type="tel"
                                                name="Celular"
                                                value={phone_contato}
                                                placeholder="Celular"
                                                className="form-control"
                                                onChange={(e) => setPhone_contato(e.target.value)}
                                                required />
                                        </div>
                                    </div>
                                    <div className="row px-2 justify-content-between col-12 mx-auto">
                                        <div className="col-4">
                                            <dt className='p-2'>👤 Endereço rua</dt>
                                            <input type="text" placeholder="Digite o nome da rua e o número da empresa"
                                                value={endereco_rua}
                                                className="form-control"
                                                onChange={(e) => setEndereco_rua(e.target.value)} required />
                                        </div>
                                        <div className="col-4">
                                            <dt className='p-2'>👤 Endereço bairro</dt>
                                            <input type="text" placeholder="Digite o bairro"
                                                value={endereco_bairro}
                                                className="form-control"
                                                onChange={(e) => setEndereco_bairro(e.target.value)} required />
                                        </div>
                                        <div className="col-4">
                                            <dt className='p-2'>👤 Endereço cidade</dt>                                            
                                            <select
                                                onChange={(e) => setEndereco_cidade(e.target.value)} required>
                                                <option value="">Selecione um município</option>
                                                {municipiosRJ.map((municipio) => (
                                                    <option key={municipio} value={municipio}>
                                                        {municipio}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row px-2 justify-content-between col-12 mx-auto mb-3">
                                        <div className="col-auto">
                                            <dt className='p-2'>👤 Número do cadastro</dt>
                                            <input type="text" placeholder="Endereço"
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
