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
    const [idTecnico, setIdTecnico] = useState("");
    const [services, setServices] = useState([])

    async function LoadTecnicos() {
        try {
            const response = await api.get("/tecnicos/listar", {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            console.log(response.data);

            if (response.data) {
                setTecnicos(response.data)
            }
        } catch (error) {
            if (error.response?.data.error)
                console.log(error.response.data.error);
        }
    }
     function ClickEdit(id_tecnico) {
        navigate("/appointments/edit/" + id_atecnico, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
    }

    useEffect(() => {
        LoadTecnicos();
        // LoadServices();
    },)

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
                                              {/* {services?.map((s)=>{
                    return<>
                    <div key={s.id_barber_service} className="w-100">
                      {s.}
                    </div>
                    </>
                  })} */}
                                        </div>
                                        <button className="btn btn-primary">Salvar</button>
                                        <button onClick={() => props.clickEdit(props.id_tecnico)} className="btn btn-danger mx-2">Editar</button>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TecnicosComponent
