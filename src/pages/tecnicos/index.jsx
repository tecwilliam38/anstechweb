import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import './style.css'
import api from '../../api/api';
// css do confirm alert
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert'
import './style.css'
import { toast, ToastContainer } from 'react-toastify';
import Tecnico from '../../components/tecnico';

function TecnicosComponent() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [tecnicos, setTecnicos] = useState([]);
    const [idTecnico, setIdTecnico] = useState("");
    const [services, setServices] = useState([])
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [endereco, setEndereco] = useState("");
    const [password, setPassword] = useState("");

    function ClickEdit(id_tecnico) {
        navigate("/register/edit/" + id_tecnico, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
    }
    async function LoadTecnicos() {
        try {
            const response = await api.get("/tecnicos/listar", {
                headers: { Authorization: `Bearer ${user.token}` },
                params: { id_tecnico: idTecnico, name, email, endereco, password }
            });

            if (response.data) {
                setTecnicos(response.data)
            }
        } catch (error) {
            if (error.response?.data.error)
                console.log(error.response.data.error);
        }
    }

    function ClickDelete(id_tecnico) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Exclusão</h1>
                        <p>Confirma exclusão desse agendamento?</p>
                        <div className="button-container">
                            <button className='btn btn-lg-primary text-light p-2 button-yes' onClick={() => { DeleteTecnico(id_tecnico); onClose(); }}>Sim</button>
                            <button className='btn btn-lg-primary text-light p-2 button-no' onClick={onClose}>Não</button>
                        </div>
                    </div>
                );
            }
        });
    }

    async function DeleteTecnico(id) {
        try {
            const response = await api.delete("/tecnicos/" + id, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            if (response?.data) {
                toast.success("Técnico excluído com sucesso!")
                setTimeout(() => {
                    LoadTecnicos();
                }, 3000);
            }

        } catch (error) {
            if (error.response?.data.error) {
                if (error.response.status == 401)
                    return navigate("/");

                alert(error.response?.data.error);
            }
            else
                alert("Erro ao excluir técnico");
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
                    autoClose={2000}
                    closeOnClick
                    position="top-center" />
                <Navbar />
                <div className="container col-10">
                    <div className="row justify-content-between">
                        <div className="h1 col-3">
                            Técnicos
                        </div>
                        <button
                            onClick={() => navigate("/cadastro/tecnicos")}
                            className="btn me-2 col-3 btn-primary  button-login">Cadastrar novo Técnico</button>
                    </div>
                </div>
                <div className="container-fluid ">
                    <div className="row d-flex justify-content-center mb-1">
                        <div className="col-10 mx-auto">
                            {tecnicos.map((tec) => (
                                <div className="card my-3 bg-form text-light" key={tec.id_tecnico}>
                                    <div className="ps-4 py-2 card-title h4">
                                        {tec.name}
                                    </div>

                                    <div className="card-body">
                                        <div className="row mb-3">
                                            <div className="col-md-3">
                                                <dt>👤 Email</dt>
                                                <div className="border p-2 bg-light text-dark rounded">
                                                    {tec.email}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <dt>📍 Endereço</dt>
                                                <div className="border p-2 bg-light text-dark rounded">
                                                    {tec.endereco}
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <dt>📱 Celular</dt>
                                                <div className="border p-2 bg-light text-dark rounded">
                                                    {tec.cel_phone}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row justify-content-between">
                                            <div className="col-md-3">
                                                <dt>🛠️ Função</dt>
                                                <div className="border p-2 bg-light text-dark rounded">
                                                    {tec.skill}
                                                </div>
                                            </div>
                                            <div className="col-md-3 d-flex align-items-end justify-content-end">
                                                <button
                                                    onClick={() => ClickEdit(tec.id_tecnico)}
                                                    className="btn btn-sm btn-primary mx-2"
                                                >
                                                    <i className="bi bi-pencil-square"></i>
                                                </button>
                                                <button
                                                    onClick={() => ClickDelete(tec.id_tecnico)}
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div >
            </div >
        </>
    )
}

export default TecnicosComponent
