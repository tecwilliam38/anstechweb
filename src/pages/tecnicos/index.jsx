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
                <div className="container-fluid topo-tecnicos">
                    <div className="row d-flex justify-content-center mb-1">
                        <div className="col-10 mx-auto ">
                            {tecnicos.map((tec) => {
                                return <section className="col-12 border bg-form my-2 px-2" key={tec.id_tecnico}>
                                    <div className="row card-title ps-4 py-2 h4 text-light">{tec.name}</div>
                                    <div className="row">
                                        <div className="col-3">
                                            <dt className='p-2'>👤 Email</dt>
                                            <div className="border p-2">
                                                {tec.email}
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <dt className='p-2'>👤 Endereço</dt>
                                            <div className="border p-2">
                                                {tec.endereco}
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <dt className='p-2'>👤 Celular</dt>
                                            <div className="border p-2">
                                                {tec.cel_phone}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-between pb-3">
                                        <div className="col-3">
                                            <dt className='p-2'>👤 Função</dt>
                                            <div className="border p-2">
                                                {tec.skill}
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <dt className='p-2'>👤 Atividades</dt>
                                            {/* {services.map((s) => {
                        return <div className='border' key={s.id_service} value={s.id_service}>
                            {s.description}
                        </div>
                    })} */}
                                        </div>
                                        <div className="col-3 d-flex align-items-end justify-content-end">
                                            <div className="justify-content-around me-3">
                                                <button onClick={() => ClickEdit(tec.id_tecnico)}
                                                    className="btn btn-sm btn-primary mx-2">
                                                    <i className="bi bi-pencil-square"></i>
                                                </button>
                                                <button onClick={() => ClickDelete(tec.id_tecnico)}
                                                    className="btn btn-sm btn-danger">
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </section >
                            })}
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}

export default TecnicosComponent
