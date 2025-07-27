import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api';
import Navbar from '../../components/navbar/index';
import { useAuth } from '../../context/authContext';
import "./style.css"
import { toast } from 'react-toastify';


function RegisterClient() {
    const navigate = useNavigate()
    const [name, setName] = useState()
    const [cel_phone, setCel_phone] = useState();
    const [endereco, setEndereco] = useState();
    const [email, setEmail] = useState("")
    const [specialty, setSpecialty] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [idTecnico, setIdTecnico] = useState("")
    const { user } = useAuth();
    const [visible, setVisible] = useState(false);
    const [tecnicos, setTecnicos] = useState([]);

    const { id_tecnico } = useParams()

    async function LoadTecnicos(id) {
        try {
            const response = await api.get("/tecnicos/listar" + id, {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            if (response?.data) {
                setName(response.dada.name)
                setEndereco(response.data.endereco)
                // setTecnicos(response.data)
            }
        } catch (error) {
            if (error.response?.data.error)
                console.log(error.response.data.error);
        }
    }
    useEffect(() => {
        LoadTecnicos();
    }, []);

    async function ExecuteAccount(e) {
        e.preventDefault();
        setMsg("");
        const json = {
            name,
            cel_phone,
            endereco,
            email,
            specialty,
            password
        }
        try {

            const response = id_tecnico > 0 ?
                await api.put("/tecnicos/" + id_tecnico, json, {
                    headers: { Authorization: `Bearer ${user.token}` }
                })
                :
                await api.post("/tecnicos/register", json, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
            console.log(id_tecnico);
            if (response.data?.id_tecnico) {
                toast("Técnico cadastrado com sucesso!")
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


    return (
        <>
            <Navbar />
            <div className="container-fluid justify-content-center align-items-center mt-page">
                <div className="container-fluid topo-tecnicos">
                    <div className="row d-flex justify-content-center mb-1">
                        <div className="col-10 mx-auto ">
                            <section className="col-12 border bg-form my-2 ">
                               <h3 className='text-light p-2 card-title'>📄 Ficha de Cadastro de Clientes</h3>
                               
                                <div className="row ps-4 py-2 h4 text-light">{name}</div>
                                <div className="row px-2">
                                    <div className="col-3">
                                        <dt className='p-2'>👤 Nome:</dt>
                                        <input
                                            type="text"
                                            name="escola"
                                            value={name}
                                            className="form-control"
                                            onChange={(e) => setName(e.targevalue)}
                                        />
                                    </div>
                                    <div className="col-3">
                                        <dt className='p-2'>👤 Email</dt>
                                        <input type="email" placeholder="E-mail"
                                            value={email}
                                            className="form-control"
                                            onChange={(e) => setEmail(e.targevalue)} />
                                    </div>
                                    <div className="col-6">
                                        <dt className='p-2'>👤 Endereço</dt>
                                        <input type="text" placeholder="Endereço"
                                            value={endereco}
                                            className="form-control"
                                            onChange={(e) => setEndereco(e.targevalue)} />
                                    </div>
                                    <div className="col-3">
                                        <dt className='p-2'>👤 Celular</dt>
                                        <input
                                            type="tel"
                                            name="Celular"
                                            value={cel_phone}
                                            placeholder="Celular"
                                            className="form-control"
                                            onChange={(e) => setCel_phone(e.targevalue)}
                                        />
                                    </div>
                                </div>
                                <div className="row justify-content-between px-2 pb-3">
                                    <div className="col-3">
                                        <dt className='p-2'>👤 Função</dt>
                                       <input type="text" placeholder="Skill"
                                       value={specialty}
                                            className="form-control"
                                            onChange={(e) => setSpecialty(e.targevalue)} />
                                    </div>
                                    <div className="col-3 d-flex align-items-end justify-content-end">
                                        <div className="justify-content-around me-3">
                                            <button onClick={() => ExecuteAccount(id_tecnico)}
                                                    className="btn btn-sm btn-primary mx-2">
                                                  Salvar  {/* <i className="bi bi-pencil-square"></i> */}
                                                </button>
                                                {/* <button onClick={() => clickDelete(id_tecnico)}
                                                    className="btn btn-sm btn-danger">
                                                    
                                                    <i className="bi bi-trash"></i>
                                                </button> */}
                                        </div>
                                    </div>
                                </div>
                            </section >
                        </div>
                    </div>
                </div >
            </div>
        </>
    )
}

export default RegisterClient
