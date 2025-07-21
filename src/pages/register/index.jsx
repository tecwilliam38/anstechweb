import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api';
import Navbar from '../../components/navbar/index';
import { useAuth } from '../../context/authContext';
import "./style.css"
import { toast } from 'react-toastify';

function RegisterTecnicoComponent() {
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

    async function LoadTecnicos(id_tecnico) {
        try {
            const response = await api.get("/tecnicos/listar" + id_tecnico, {
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
    function ClickEdit(id_tecnico) {
        navigate("/register/edit/" + id_tecnico, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
    }
console.log(id_tecnico);


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
                <div className="container card-shadow border p-3">
                    {
                        id_tecnico > 0 ? <h3>📄 Editar Técnico</h3> : <h3>📄 Ficha de Cadastro de Técnicos</h3>
                    }

                    {tecnicos?.map((ts)=>{
                        return<div key={ts.id_tecnico}>William</div>
                    })}

                    {tecnicos?.map((t) => {
                        return (
                            <>
                                <form className="mt-4" key={t.id_tecnico}>
                                    <div className="mb-3">
                                        <label className="form-label">Nome do Técnico</label>
                                        <input
                                            type="text"
                                            name="escola"
                                            value={t.name}
                                            className="form-control"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Celular</label>
                                        <input
                                            type="tel"
                                            name="Celular"
                                            placeholder="Celular"
                                            className="form-control"
                                            onChange={(e) => setCel_phone(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Endereço</label>
                                        <input type="text" placeholder="Endereço"
                                        value={t.endereco}
                                            className="form-control"
                                            onChange={(e) => setEndereco(e.target.value)} />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Skill</label>
                                        <input type="text" placeholder="Skill"
                                            className="form-control"
                                            onChange={(e) => setSpecialty(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">E-mail</label>
                                        <input type="email" placeholder="E-mail"
                                            value={email}
                                            className="form-control"
                                            onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="mt-2 position-relative">
                                        <input type={visible ? "text" : "password"} placeholder="Senha"
                                            className="form-control"
                                            onChange={(e) => setPassword(e.target.value)} />
                                        <i
                                            className={`bi ${visible ? "bi-eye" : "bi-eye-slash"} position-absolute`}
                                            onClick={() => setVisible(!visible)}
                                            style={{
                                                fontSize: "1.3rem",
                                                top: "50%",
                                                right: "15px",
                                                transform: "translateY(-50%)",
                                                cursor: "pointer",
                                                color: "#7b7e80"
                                            }}
                                        ></i>
                                    </div>

                                    <div className="mt-3 mb-2">
                                        <button onClick={ExecuteAccount} className="btn btn-primary button-login p-2 w-100" type="button">
                                            Cadastrar técnico
                                        </button>
                                    </div>
                                </form>
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default RegisterTecnicoComponent
