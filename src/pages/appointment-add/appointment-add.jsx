import { Link, useNavigate, useParams } from "react-router-dom";

import React, { useEffect, useState } from "react";


import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "../../context/authContext";
import api from "../../api/api";
import Navbar from "../../components/navbar/index.jsx";

function AppointmentAdd() {

    const navigate = useNavigate();
    const { id_appointment } = useParams();

    const [clients, setClients] = useState([]);
    const [idClients, setIdClients] = useState("");
    const [tecnicos, setTecnicos] = useState([]);
    const [services, setServices] = useState([]);
    const [status, setStatus] = useState("");

    const [idUser, setIdUser] = useState("");
    const [idTecnico, setIdTecnico] = useState();
    const [idService, setIdService] = useState("");
    const [bookingDate, setBookingDate] = useState("");
    const [bookingHour, setBookingHour] = useState("");

    const { user } = useAuth();

    async function LoadClients() {
        try {
            const response = await api.get("client/listar", {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            if (response.data) {
                setClients(response.data);
            }

        } catch (error) {
            if (error.response?.data.error) {
                if (error.response.status == 401)
                    return navigate("/");

                alert(error.response?.data.error);
            }
            else
                alert("Erro ao listar Clientes");
        }
    }

    async function LoadTecnicos() {
        try {
            const response = await api.get("/listar", {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            if (response.data) {
                setTecnicos(response.data);
                if (id_appointment > 0) {
                    LoadAppointment(id_appointment);
                }
            }

        } catch (error) {
            if (error.response?.data.error) {
                if (error.response.status == 401)
                    return navigate("/");
                alert(error.response?.data.error);
            }
            else
                alert("Erro ao listar técnicos.");
        }
    }
     
    async function LoadAppointment(id) {
        try {
            const response = await api.get("/appointments/listar/" + id, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            if (response?.data) {
                setIdClients(response.data.id_client);
                setIdTecnico(response.data.id_tecnico);
                setIdService(response.data.id_service);
                setStatus(response.data.status);
                setBookingDate(response.data.booking_date);
                setBookingHour(response.data.booking_hour);
            }

        } catch (error) {
            if (error.response?.data.error) {
                if (error.response.status == 401)
                    alert(error.response?.data.error);
            }
            else
                alert("Erro ao listar serviços do tecnico");
        }
    }
    
    async function LoadServices(id) {
        
        // alert(id)
       
        if (!id)
            return;
        try {
            const response = await api.get("/tecnicos/services/" + id , {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            // console.log(response.data);
            
            if (response.data) {
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

    async function SaveAppointment() {
        const json = {
            id_client: idClients,
            id_tecnico: idTecnico,
            id_service: idService,
            status,
            booking_date: bookingDate,
            booking_hour: bookingHour
        };

        try {
            const response = id_appointment > 0 ?
                await api.put("/appointments/edit/" + id_appointment, json, {
                    headers: { Authorization: `Bearer ${user.token}` }
                })
                :
                await api.post("/appointments/insert", json, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
            if (response.data?.id_appointment) {
                toast.success("Agendamento realizado com sucesso!")
                setTimeout(() => {
                    navigate("/appointments");
                }, 3000);
            } else {
                toast.error("Data indisponível, selecione outro Horário ou dia por gentileza.",
                    setTimeout(() => {
                        setBookingDate(""), setBookingHour("")
                    }, 6000))
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
        }
    }

    useEffect(() => {
        LoadClients();
        LoadTecnicos();
    }, []);

    useEffect(() => {
        LoadServices(idTecnico);
    }, [idTecnico]);

    return <>
        <div className="container-fluid mt-add">
            <ToastContainer
                className='Toastify__toast-body'
                autoClose={3000}
                closeOnClick
                position="top-center" />
            <Navbar />
            <div className="container-fluid mb-5 my-4">
                <div className="row col-lg-8 margin-form border offset-lg-2 rounded shadow-lg px-4 py-3">
                    {/* <div className="row justify-content-between"> */}
                    <div className="col-12 mt-1 text-center">
                        <h2>
                            {
                                id_appointment > 0 ? "Editar Chamado" : "Novo Chamado"
                            }
                        </h2>
                    </div>
                    <div className="col-12 mt-2">
                        <label htmlFor="user" className="form-label">Cliente</label>
                        <div className="form-control mb-2">
                            <select name="user" id="user"
                                value={idClients} onChange={(e) => setIdClients(e.target.value)} >
                                <option value="0">Selecione o Cliente</option>
                                {clients?.map((c) => {
                                    return (<React.Fragment key={c.id_client}>
                                        <option value={c.id_client} >{c.client_name}</option>
                                    </React.Fragment>)
                                })}

                            </select>

                        </div>
                    </div>
                    <div className="col-12 mt-2">
                        <label htmlFor="Tecnico" className="form-label">Técnico</label>
                        <div className="form-control mb-2">
                            <select name="Técnico" id="Tecnico"
                                value={idTecnico} onChange={(e) => setIdTecnico(e.target.value)} >
                                <option value="0">Selecione o técnico</option>
                                {tecnicos?.map(t => {
                                    return (<React.Fragment key={t.id_user}>
                                        <option value={t.id_tecnico}>{t.user_name}</option>
                                    </React.Fragment>)
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="col-12 mt-2">
                        <label htmlFor="service" className="form-label">Serviço</label>
                        <div className="form-control mb-2">
                            <select name="service" id="service"
                                value={idService} onChange={(e) => setIdService(e.target.value)}
                            >
                                <option value="0">Selecione o serviço</option>
                                {services?.map(s => {
                                    return <option key={s.id_service}
                                        value={s.id_service}>{s.descricao}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="row justify-content-around">
                        <div className="col-4 mt-2">
                            <label htmlFor="bookingDate" className="form-label">Data para o agendamento:</label>
                            <input type="date" className="form-control" name="bookingDate" id="bookingDate"
                                value={bookingDate}
                                onChange={(e) => setBookingDate(e.target.value)}
                            />
                        </div>
                        <div className="col-4 mt-2">
                            <label htmlFor="bookingHour" className="form-label">Horário</label>
                            <div className="form-control mb-2">
                                <select name="bookingHour" id="bookingHour"
                                    value={bookingHour} onChange={(e) => setBookingHour(e.target.value)} >
                                    <option value="00:00">Horário</option>
                                    <option value="08:00">08:00</option>
                                    <option value="09:00">09:00</option>
                                    <option value="09:30">09:30</option>
                                    <option value="10:00">10:00</option>
                                    <option value="10:30">10:30</option>
                                    <option value="11:00">11:00</option>
                                    <option value="11:00">Almoço</option>
                                    <option value="11:30">Almoço</option>
                                    <option value="12:00">Almoço</option>
                                    <option value="12:30">Almoço</option>
                                    <option value="13:00">13:00</option>
                                    <option value="13:30">13:30</option>
                                    <option value="14:00">14:00</option>
                                    <option value="14:30">14:30</option>
                                    <option value="15:00">15:00</option>
                                    <option value="15:30">15:30</option>
                                    <option value="16:00">16:00</option>
                                    <option value="16:30">16:30</option>
                                    <option value="17:00">17:00</option>
                                    <option value="17:30">17:30</option>
                                    <option value="18:00">18:00</option>
                                    <option value="18:30">18:30</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-4 mt-2">
                            <label htmlFor="bookingHour" className="form-label">Status</label>
                            <div className="form-control mb-2">
                                <select name="bookingHour" id="bookingHour"
                                    value={status} onChange={(e) => setStatus(e.target.value)} >
                                    <option value="Status">Status</option>
                                    <option value="Agendado">Agendado</option>
                                    <option value="Em andamento">Em andamento</option>
                                    <option value="Em deslocamento">Em deslocamento</option>
                                    <option value="No cliente">No cliente</option>
                                    <option value="Cancelado">Cancelado</option>
                                    <option value="Finalizado">Finalizado</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-12 mt-3">
                            <div className="d-flex justify-content-end">
                                <Link to="/appointments"
                                    className="btn btn-outline-primary me-3">
                                    Cancelar
                                </Link>
                                <button
                                    onClick={SaveAppointment}
                                    className="btn btn-primary" type="button">
                                    Salvar Dados
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    </>
}

export default AppointmentAdd;