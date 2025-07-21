import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import './style.css'
import api from '../../api/api';

function TecnicosComponent() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [tecnicos, setTecnicos] = useState([]);
    const [idTecnico, setIdTecnico] = useState(1);
    const [services, setServices] = useState([])

    async function LoadTecnicos() {
        try {
            const response = await api.get("/tecnicos/listar", {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            if (response?.data) {
                setTecnicos(response.data)
                setIdTecnico(1)
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

    function ClickEdit(id_tecnico) {
        navigate("/register/edit/" + id_tecnico, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
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
            <Navbar />
            <div className="container-fluid">
                <div className="row d-flex justify-content-center mb-1">                    
                    <div className="container-fluid">
                        {tecnicos?.map((t) => {
                            return <div className="col-12  col-lg-12 col-md-12 mt-2" key={t.id_tecnico}>
                                <div className="card shadow-lg border card-shadow">
                                    <div className="card-body p-4">
                                        <h5 className="card-title h2">{t.name}</h5>
                                        <div className="row justify-content-between px-4">
                                            Telefone:<p className="card-text">{t.cel_phone}</p>
                                            Endereço:<p className="card-text">{t.endereco}</p>
                                            Competências:<p className="card-text">{t.skill} </p>

                                        </div>
                                        <button className="btn btn-primary">Salvar</button>
                                        <button onClick={() => ClickEdit(t.id_tecnico)} className="btn btn-danger button-login mx-2">Editar</button>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                    {services?.map((s) => {
                        return <div key={s.id_service} value={s.id_service}>
                            {s.description}
                        </div>
                    })}
                    {/* {services?.map(s => {
                        return <option key={s.id_service}
                            value={s.id_service}>{s.price}</option>
                    })} */}
                </div>
            </div>
        </>
    )
}

export default TecnicosComponent
