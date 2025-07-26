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
import { ToastContainer } from 'react-toastify';

function TecnicosComponent() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [tecnicos, setTecnicos] = useState([]);
    const [idTecnico, setIdTecnico] = useState();
    const [services, setServices] = useState([])

    async function LoadTecnicos() {
        try {
            const response = await api.get("/tecnicos/listar", {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            if (response?.data) {
                setTecnicos(response.data)
                setIdTecnico(response.data.id_tecnico)
               }
        } catch (error) {
            if (error.response?.data.error)
                console.log(error.response.data.error);
        }
    }

    async function LoadServices(id) {
        if (!id) {
            return;
        }
        try {
            const response = await api.get("/tecnicos/" + id + "/services", {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            if (response?.data) {
                setServices(response.data);
            }
        } catch (error) {
            if (error.response?.data.error) {
                if (error.response.status == 401)
                    return navigate("/");

                alert(error.response?.data.error);
            }
            else
                alert("Erro ao listar Serviços");
        }
    }

    function ClickEdit(id) {
        navigate("/register/edit/" + id, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
    }


    function ClickDelete(id_tecnico) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Exclusão</h1>
                        <p>Confirma exclusão desse agendamento?</p>
                        <div className="button-container">
                            <button className='btn btn-lg-primary text-light p-2 button-yes' onClick={() => { DeleteAppointment(id_appointment); onClose(); }}>Sim</button>
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
                toast("Agendamento excluído com sucesso!")
                setTimeout(() => {
                    LoadAppointments();
                }, 5000);
            }

        } catch (error) {
            if (error.response?.data.error) {
                if (error.response.status == 401)
                    return navigate("/");

                alert(error.response?.data.error);
            }
            else
                alert("Erro ao excluir reserva");
        }
    }


    useEffect(() => {
        LoadTecnicos();
        setIdTecnico(1)
    }, [])

    useEffect(() => {
        LoadServices(idTecnico);
    }, [idTecnico]);

    return (
        <>
            <div className="container-fluid mt-add">
                <ToastContainer
                    className='Toastify__toast-body'
                    autoClose={5000}
                    closeOnClick
                    position="top-center" />
                <Navbar />
                <div className="container-fluid topo-tecnicos">
                    <div className="row d-flex justify-content-center mb-1">
                        <div className="col-10 mx-auto ">
                            {tecnicos?.map((t) => {
                                return (
                                    <>
                                        <section className="col-12 border bg-form my-2 px-2" key={t.id_tecnico}>
                                            <div className="row card-title ps-4 py-2 h4 text-light">{t.name}</div>
                                            <div className="row">
                                                <div className="col-3">
                                                    <dt className='p-2'>👤 Email</dt>
                                                    <div className="border p-2">
                                                        {t.email}
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <dt className='p-2'>👤 Endereço</dt>
                                                    <div className="border p-2">
                                                        {t.endereco}
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <dt className='p-2'>👤 Celular</dt>
                                                    <div className="border p-2">
                                                        {t.cel_phone}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row justify-content-between pb-3">
                                                <div className="col-3">
                                                    <dt className='p-2'>👤 Função</dt>
                                                    <div className="border p-2">
                                                        {t.skill}
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <dt className='p-2'>👤 Atividades</dt>
                                                    {services?.map((s) => {
                                                        return <div className='border' key={s.id_service} value={s.id_service}>
                                                            {s.description}
                                                        </div>
                                                    })}
                                                </div>
                                                <div className="col-3 d-flex align-items-end justify-content-end">
                                                    <div className="justify-content-around me-3">
                                                        <button onClick={() => ClickEdit(t.id_tecnico)}
                                                            className="btn btn-sm btn-primary mx-2">
                                                            <i className="bi bi-pencil-square"></i>
                                                        </button>
                                                        <button onClick={() => clickDelete(t.id_tecnico)}
                                                            className="btn btn-sm btn-danger">
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </section >
                                    </>
                                )
                            })}

                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}

export default TecnicosComponent
