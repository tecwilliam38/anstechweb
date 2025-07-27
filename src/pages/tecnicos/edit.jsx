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
    const [tecnicos, setTecnicos] = useState([]);
    const [msg, setMsg] = useState("");
    const { id_tecnico } = useParams();

    async function LoadTecnicos() {
        try {
            const response = await api.get("/tecnicos/listar/" + id_tecnico, {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            if (response.data) {
                setTecnicos(response.data)
            }
        } catch (error) {
            if (error.response?.data.error)
                console.log(error.response.data.error);
        }
    }

    async function SaveTecnico(id_tecnico) {
        setMsg("");
        const json = {
            name: tecnicos.name,
            endereco: tecnicos.endereco,
            cel_phone: tecnicos.cel_phone,
            email: tecnicos.email,
            specialty: tecnicos.skill
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
                                    {tecnicos.name}
                                </div>
                                <div className="row">
                                    <div className="col-3">
                                        <dt className='p-2'>👤 Nome</dt>
                                        <input
                                            value={tecnicos.name}
                                            onChange={(e) => setTecnicos({ ...tecnicos, name: e.target.value })}
                                            placeholder="Email"
                                            type="text"
                                            className="form-control" />
                                    </div>
                                    <div className="col-3">
                                        <dt className='p-2'>👤 Email</dt>
                                        <input
                                            value={tecnicos.email}
                                            onChange={(e) => setTecnicos({ ...tecnicos, email: e.target.value })}
                                            placeholder="Email"
                                            type="text"
                                            className="form-control" />
                                    </div>
                                    <div className="col-3">
                                        <dt className='p-2'>👤 Celular</dt>
                                        <input
                                            value={tecnicos.cel_phone}
                                            onChange={(e) => setTecnicos({ ...tecnicos, cel_phone: e.target.value })}
                                            placeholder="Endereço"
                                            type="text"
                                            className="form-control" />
                                    </div>
                                </div>
                                <div className="row justify-content-between pb-3">
                                    <div className="col-6">
                                        <dt className='p-2'>👤 Endereço</dt>
                                        <input
                                            value={tecnicos.endereco}
                                            onChange={(e) => setTecnicos({ ...tecnicos, endereco: e.target.value })}
                                            placeholder="Endereço"
                                            type="text"
                                            className="form-control" />
                                    </div>
                                    <div className="col-3">
                                        <dt className='p-2'>👤 Função</dt>
                                        <input
                                            value={tecnicos.skill}
                                            onChange={(e) => setTecnicos({ ...tecnicos, skill: e.target.value })}
                                            placeholder="Endereço"
                                            type="text"
                                            className="form-control" />
                                    </div>

                                    <div className="col-3 d-flex align-items-end justify-content-end">
                                        <div className="justify-content-around me-3">
                                            <button onClick={SaveTecnico}
                                                className="btn button-send mb-1 btn-sm btn-primary mx-2">
                                                Salvar
                                                <i class="mx-1 bi bi-check-square-fill"></i>
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
