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

    // const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    const { user } = useAuth();

    async function LoadClients() {
        try {
            const response = await api.get("client/listar", {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            if (response.data) {
                setClients(response.data);
                console.log(response.data);

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
            const response = await api.get("tecnicos/listar", {
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
        // try {
        //     const response = await api.get("/appointments/listar/" + id, {
        //         headers: { Authorization: `Bearer ${user.token}` }
        //     });
        //     if (response?.data) {
        //         setIdClients(response.data.id_client);
        //         setIdTecnico(response.data.id_tecnico);
        //         setIdService(response.data.id_service);
        //         setStatus(response.data.status);
        //         setBookingDate(response.data.booking_date);
        //         setBookingHour(response.data.booking_hour);
        //     }

        // } catch (error) {
        //     if (error.response?.data.error) {
        //         if (error.response.status == 401)
        //     alert(error.response?.data.error);
        //     }
        //     else
        //         alert("Erro ao listar serviços");
        //   }
    }

    async function LoadServices(id) {

        // if (!id)
        //     return;
        // try {
        //     const response = await api.get("/tecnicos/" + id + "/services", {
        //         headers: { Authorization: `Bearer ${user.token}` }
        //     });

        //     if (response.data) {
        //         setServices(response.data);                
        //     }

        // } catch (error) {
        //     if (error.response?.data.error) {
        //         if (error.response.status == 401)
        //             return navigate("/");

        //         alert(error.response?.data.error);
        //     }
        //     else
        //         alert("Erro ao listar Serviços");
        // }
    }

    async function SaveAppointment() {
        // const json = {
        //     id_client: idClients,
        //     id_tecnico: idTecnico,
        //     id_service: idService,
        //     status,
        //     booking_date: bookingDate,
        //     booking_hour: bookingHour
        // };

        // try {
        //     const response = id_appointment > 0 ?
        //         await api.put("/appointments/edit/" + id_appointment, json, {
        //             headers: { Authorization: `Bearer ${user.token}` }
        //         })
        //         :
        //         await api.post("/appointments/insert", json, {
        //             headers: { Authorization: `Bearer ${user.token}` }
        //         });

        //     // if (response.data) {
        //     if (response.data?.id_appointment) {
        //         toast("Agendamento realizado com sucesso!")
        //         setTimeout(() => {
        //             navigate("/appointments");
        //         }, 3000);
        //     }
        // } catch (error) {
        //     if (error.response?.data.error) {
        //         if (error.response.status == 401)
        //             alert("erro 401");
        //         return navigate("/");

        //         alert(error.response?.data.error);
        //     }
        //     else
        //         alert("Erro ao salvar dados");
        // }
    }

    useEffect(() => {
        LoadClients();
        LoadTecnicos();
    }, []);

    useEffect(() => {
        LoadServices(idTecnico);
    }, [idTecnico]);

    return <>
        <div className="container-fluid mt-page">
            <ToastContainer
                className='Toastify__toast-body'
                autoClose={5000}
                closeOnClick
                position="top-center" />
            <Navbar />
            <div className="container-fluid mb-5 my-4">
                <div className="row col-lg-8 margin-form border offset-lg-2 rounded shadow-lg px-4 py-3">
                    <div className="col-12 mt-1 text-center">
                        <h2>
                            {
                                id_appointment > 0 ? "Editar Agendamento" : "Novo Agendamento"
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
                                    return (<React.Fragment key={t.id_tecnico}>
                                        <option value={t.id_tecnico}>{t.name}</option>
                                    </React.Fragment>)
                                })}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default AppointmentAdd;