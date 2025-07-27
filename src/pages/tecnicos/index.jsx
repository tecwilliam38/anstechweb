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

    async function LoadTecnicos() {
        try {
            const response = await api.get("/tecnicos/listar", {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            if (response.data) {
                setTecnicos(response.data)
                console.log(idTecnico);
                console.log("Id:",response.id_tecnico);
            }
        } catch (error) {
            if (error.response?.data.error)
                console.log(error.response.data.error);
        }
    }

    async function LoadServices(idTecnico) {


        if (!idTecnico) {
            console.log("Não puxou os services");
            return;
        }
        try {
            const response = await api.get("/tecnicos/" + idTecnico + "/services", {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            if (response?.data) {
                setServices(response.data);
                console.log("Puxou os services");
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
        navigate("/tecnicos/edit/" + id, {
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
                alert("Erro ao excluir reserva");
        }
    }


    useEffect(() => {
        LoadTecnicos();
        LoadServices(tecnicos.id_tecnico);
    }, [tecnicos.id_tecnico])


    return (
        <>
            <div className="container-fluid mt-add">
                <ToastContainer
                    className='Toastify__toast-body'
                    autoClose={2000}
                    closeOnClick
                    position="top-center" />
                <Navbar />
                <div className="container-fluid topo-tecnicos">
                    <div className="row d-flex justify-content-center mb-1">
                        <div className="col-10 mx-auto ">
                            {tecnicos?.map((t) => {
                                return (
                                    <>
                                      <Tecnico key={t.id_tecnico}
                                      it_tecnico={t.id_tecnico}
                                      name={t.name}
                                      endereco={t.endereco}
                                      cel_phone={t.cel_phone}
                                      email={t.email}
                                      password={t.password}
                                      specialty={t.specialty}
                                      skill={t.skill}
                                      ClickEdit={ClickEdit}
                                      ClickDelete={ClickDelete}
                                      />
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
