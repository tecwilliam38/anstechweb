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

function TecnicosEditComponent() {
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const { id_tecnico } = useParams();

    const [msg, setMsg] = useState("");


    // Tecnico data
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [endereco, setEndereco] = useState("");
    const [cel_phone, setCel_phone] = useState("")
    const [skill, setSkill] = useState("")
    const [password, setPassword] = useState("")

    const [skillInsert, setSkillInsert] = useState("");
    const [id_service, setId_service] = useState("");
    const [price, setPrice] = useState('');
    
    console.log(id_tecnico);
    

    async function LoadTecnicos() {
        try {
            const response = await api.get("/tecnicos/listar/" + id_tecnico, {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            if (response.data) {
                setName(response.data.name);
                setEmail(response.data.email);
                setCel_phone(response.data.cel_phone);
                setEndereco(response.data.endereco);
                setSkill(response.data.skill);
                setPassword(response.data.password);
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
            email: email,
            password: password
        }
        const skillList = {
            id_service: id_service,
            price: price
        }
        try {
            const response = await api.put("/tecnicos/" + id_tecnico, json, {
                headers: { Authorization: `Bearer ${user.token}` }
            })           
            
            const responseSkill = await api.post("/tecnicos/skills/" + id_tecnico,
                skillList,
                {
                    headers: { Authorization: `Bearer ${user.token}` }
                }
            )
            if (response.data && responseSkill.data) {
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
    const opcoes = [
        { id: 1, label: 'Manutenção', value: 'manutencao' },
        { id: 2, label: 'Instalação de 1 a 3 Aps', value: 'instalacao_1_3' },
        { id: 3, label: 'Instalação de 4 a 6 Aps', value: 'instalacao_4_6' },
        { id: 4, label: 'Instalação de 7 a 10 Aps', value: 'instalacao_7_10' },
        { id: 5, label: 'Instalação de 11 a 13 Aps', value: 'instalacao_11_13' },
        { id: 6, label: 'Instalação de 14 a 18 Aps', value: 'instalacao_14_18' },
        { id: 7, label: 'Configuração Escolas', value: 'configuracao_escolas' },
        { id: 8, label: 'Outros', value: 'outros' },
    ];

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
                                <div className="row justify-content-between p-3">
                                    <div className="row px-2 mb-3 justify-content-between col-12 ">
                                        <div className="col-auto">
                                            <dt className='p-2'>👤 Nome</dt>
                                            <input
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Nome do Usuário"
                                                type="text"
                                                className="form-control" />
                                        </div>
                                        <div className="col-auto">
                                            <dt className='p-2'>👤 Email</dt>
                                            <input
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Email"
                                                type="text"
                                                className="form-control" />
                                        </div>
                                        <div className="col-auto">
                                            <dt className='p-2'>👤 Celular</dt>
                                            <input
                                                value={cel_phone}
                                                onChange={(e) => setCel_phone(e.target.value)}
                                                placeholder="Celular com ddd"
                                                type="text"
                                                className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row px-2 mb-3 justify-content-between col-10 ">
                                    <div className="col-auto">
                                        <dt className='p-2'>👤 Senha</dt>
                                        <input
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Senha"
                                            type="text"
                                            className="form-control" />
                                    </div>
                                    <div className="col-auto">
                                        <label htmlFor="selectServico" className="form-label">Skill</label>
                                        <select
                                            id="selectServico"
                                            className="form-select"
                                            value={id_service}
                                            onChange={(e) => setId_service(e.target.value)}
                                        >
                                            <option value="">Selecione uma opção...</option>
                                            {opcoes.map((opcao) => (
                                                <option key={opcao.id} value={opcao.id}>{opcao.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="row justify-content-between p-3">
                                    <div className="col-2">
                                        <dt className='p-2'>👤 Preço</dt>
                                        <input
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            placeholder="Preço"
                                            type="text"
                                            className="form-control" />
                                    </div>
                                    <div className="col-4">
                                        <dt className='p-2'>👤 Endereço</dt>
                                        <input
                                            value={endereco}
                                            onChange={(e) => setEndereco(e.target.value)}
                                            placeholder="Endereço"
                                            type="text"
                                            className="form-control" />
                                    </div>
                                    <div className="col-2">
                                        <dt className='p-2'>👤 Função</dt>
                                        <input
                                            value={skill ?? ""}
                                            // onChange={(e) => setTecnicos({ ...tecnicos, skill: e.target.value })}
                                            placeholder="Endereço"
                                            type="text"
                                            className="form-control" />
                                    </div>

                                    <div className="col-auto d-flex align-items-end justify-content-end">
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

export default TecnicosEditComponent
