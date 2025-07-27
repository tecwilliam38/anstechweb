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
import Client from '../../components/client';


function ClientComponent() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [clients, setClients] = useState([]);
    const [idClient, setIdClient] = useState("");
    const [services, setServices] = useState([])
    const [clientName, setClientName] = useState("");
    const [email, setEmail] = useState("");
    const [enderecoRua, setEnderecoRua] = useState("");
    const [enderecoBairro, setEnderecoBairro] = useState("");
    const [enderecoCidade, setEnderecoCidade] = useState("");
    const [enderecoUf, setEnderecoUf] = useState("");
    const [password, setPassword] = useState("");
    const [task, setTask] = useState("");
    const [docId, setDocId] = useState("");

    function ClickEdit(id_client) {
        navigate("/register/edit/" + id_client, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
    }
    async function LoadClients() {
        try {
            const response = await api.get("/client/listar", {
                headers: { Authorization: `Bearer ${user.token}` },
                params: {
                    id_client: idClient,
                    client_name: clientName,
                    email,
                    endereco_rua: enderecoRua,
                    endereco_bairro: enderecoBairro,
                    endereco_cidade: enderecoCidade,
                    endereco_uf: enderecoUf,
                    task: task,
                    doc_id: docId,
                    password
                }
            });

            if (response.data) {
                setClients(response.data)
                console.log("clientes:", response.data);

            }
        } catch (error) {
            if (error.response?.data.error)
                console.log(error.response.data.error);
        }
    }

    function ClickDelete(id_client) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Exclusão</h1>
                        <p>Confirma exclusão desse agendamento?</p>
                        <div className="button-container">
                            <button className='btn btn-lg-primary text-light p-2 button-yes' onClick={() => { DeleteTecnico(id_client); onClose(); }}>Sim</button>
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
                    LoadClients();
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
        LoadClients();
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
                            {clients.map((cl) => {
                                return <Client key={cl.id_client}
                                    // id_client={cl.id_client}
                                    nomeClient={cl.client_name}
                                    enderecoRua={cl.endereco_rua}
                                    enderecoBairro={cl.endereco_bairro}
                                    enderecoCidade={cl.endereco_cidade}
                                    enderecoUf={cl.endereco_uf}
                                    email={cl.email}
                                    contato={cl.phone_contato}
                                    status={cl.tarefa}
                                    docId={cl.inep}
                                />
                            })}
                            {/* <Client /> */}
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}

export default ClientComponent
