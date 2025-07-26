import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api';
import Navbar from '../../components/navbar/index';

import "./style.css"
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../../context/authContext';



function TecnicoRegister() {

    const navigate = useNavigate()
    // const [name, setName] = useState("")
    // const [cel_phone, setCel_phone] = useState("");
    // const [endereco, setEndereco] = useState("");
    // const [email, setEmail] = useState("")
    // const [specialty, setSpecialty] = useState("");
    // const [password, setPassword] = useState("");
    // const [msg, setMsg] = useState("");
    // const [idTecnico, setIdTecnico] = useState("")
    const [visible, setVisible] = useState(false);
    // const [tecnicos, setTecnicos] = useState([]);

    // 
    const [name, setName] = useState("");
    const [endereco, setEndereco] = useState("");
    const [cel_phone, setCelPhone] = useState("");
    const [email, setEmail] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");




    const { user } = useAuth();

    async function ExecuteAccount() {
        setMsg("");
        try {
            const response = await api.post("/tecnicos/register", {
                name,
                endereco,
                cel_phone,
                email,
                specialty,
                password
            }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            if (response?.data) {
                toast("Cadastro realizado com sucesso!")
                setTimeout(() => {
                    navigate("/appointments/tecnicos");
                    // navigate("/appointments");
                }, 3000);
            } else
                setMsg("Erro ao criar conta. Tente novamente mais tarde.");

        } catch (error) {
            if (error.response?.data.error) {
                alert(error)
                setMsg(error.response?.data.error);
            } else
                setMsg("Erro ao criar conta. Tente novamente mais tarde.");
        }

    }
    function ChangeFuncao(e) {
        setSpecialty(e.target.value);
    }

    return (
        <>
            <ToastContainer
                className="Toastify__toast-body"
                autoClose={5000}
                closeOnClick
                position="top-center"
            />
            <Navbar />
            <form className='container-fluid justify-content-center align-items-center mt-page'
                onSubmit={(e) => {
                    e.preventDefault();
                    ExecuteAccount();
                }}>
                <div className="container-fluid topo-tecnicos">
                    <div className="row d-flex justify-content-center mb-1">
                        <div className="col-10 mx-auto ">
                            <section className="col-12 border bg-form my-2 ">
                                <h3 className='text-light p-2 card-title'>📄 Ficha de Cadastro de Técnicos</h3>
                                <div className="row px-2 justify-content-around">
                                    <div className="col-5">
                                        <dt className='p-2'>👤 Nome:</dt>
                                        <input className='form-control' type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" required />
                                    </div>
                                    <div className="col-5">
                                        <dt className='p-2'>👤 Endereço</dt>
                                        <input className='form-control' type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder="Endereço" required />
                                    </div>
                                    <div className="col-2">
                                        <dt className='p-2'>👤 Celular</dt>
                                        <input className='form-control' type="text" value={cel_phone} onChange={(e) => setCelPhone(e.target.value)} placeholder="Celular" required />
                                    </div>
                                    <div className="row px-2 mb-3 justify-content-around">
                                        <div className="col-4">
                                            <dt className='p-2'>👤 E-mail</dt>
                                            <input className='form-control' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                                        </div>
                                        <div className="col-3">
                                            <dt className='p-2'>👤 Função</dt>
                                            <select className='form-control' name="tecnico" id="tecnico" onChange={ChangeFuncao}>
                                                <option value="">Escolha uma função...</option>
                                                <option value={"Tecnico Geral"} >Técnico Geral</option>
                                                <option value={"Tecnico Redes"} >Técnico de Redes</option>
                                                <option value={"Tecnico Rollout"} >Técnico de Rollout</option>
                                        </select>
                                        {/* <input className='form-control' type="text" value={specialty} onChange={(e) => setSpecialty(e.target.value)} placeholder="Especialidade" required /> */}
                                    </div>
                                    <div className="col-3 position-relative">
                                        <dt className='p-2'>👤 Senha</dt>
                                        <input className='form-control'
                                            type={visible ? "text" : "password"}
                                            //  type="password" 
                                            value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" required />
                                        <i
                                            className={`bi ${visible ? "bi-eye" : "bi-eye-slash"} position-absolute me-2`}
                                            onClick={() => setVisible(!visible)}
                                            style={{
                                                fontSize: "1.3rem",
                                                top: "75%",
                                                right: "15px",
                                                transform: "translateY(-50%)",
                                                cursor: "pointer",
                                                color: "#7b7e80"
                                            }}
                                        ></i>
                                    </div>
                                    <div className="col-2 d-flex align-items-end justify-content-center">
                                        <button type="submit" className="btn btn-sm btn-primary mx-2">Cadastrar</button>
                                    </div>
                                </div>
                                {msg && <p style={{ color: "red" }}>{msg}</p>}
                        </div>
                    </section>
                </div>
            </div>
        </div >
            </form >
        </>
    )
}

export default TecnicoRegister
