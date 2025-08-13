import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import Navbar from '../../components/navbar'
import Sidebar from '../../components/sidebar'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import api from '../../api/api'
import Appointment from '../../components/appointment'
import * as Icon from 'react-bootstrap-icons';
// css do confirm alert
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert'
import './style.css'

function Appointments() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);

  const [idTecnico, setIdTecnico] = useState(null);
  const [dtStart, setDtStart] = useState("");
  const [dtEnd, setDtEnd] = useState("");



  async function LoadAppointments() {
    const json = { id_tecnico: idTecnico, dt_start: dtStart, dt_end: dtEnd };
    try {
      const response = await api.post("/appointments/listar/", json,
        { headers: { Authorization: `Bearer ${user.token}` } });
      if (response.data.length > 0) {
        console.log(response.data);
      }
      if (response.data) {
        setAppointments(response.data)
      }
    } catch (error) {
      if (error.response?.data.error) {

        if (error.response.status == 401)
          return navigate("/");

        alert(error.response?.data.error);
      }
      else
        alert("Erro ao Carregar agendamentos.");
    }
  }

  function ClickEdit(id_appointment) {
    navigate("/appointments/edit/" + id_appointment, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
  }

  function ClickDelete(id_appointment) {
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

  async function DeleteAppointment(id) {
    try {
      const response = await api.delete("/appointments/" + id, {
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
    LoadAppointments();
  }, []);

  async function LoadTecnicos() {
    try {
      const response = await api.get("/tecnicos/listar", {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      if (response.data) {
        setTecnicos(response.data);
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

  function ClearFilter() {
    setIdTecnico("");
    setDtStart("");
    setDtEnd("");
    return LoadAppointments();
  }

  return (
    <>
      <div className="container-fluid mt-page">
        <ToastContainer
          className="Toastify__toast-body"
          autoClose={3000}
          closeOnClick
          position="top-center"
        />
        <Navbar />
        <div className="row">
          <div className="col-12 col-md-11 mx-auto my-1">
            <div className="d-flex justify-content-around align-items-center mb-4 mt-5 p-2">
              <div className="col-5">
                <h2 className="d-inline me-2 h4 text-dark">Agendamentos</h2>
                <Link to="/appointments/add" className="btn btn-outline-primary menu-name">Novo Chamado </Link>
              </div>
              {/* Campo de filtro inicio */}
              <div className="d-flex nav-right justify-content-end">
                <span className="m-2">De</span>
                <input id="startDate" className="form-control" type="date" onChange={(e) => setDtStart(e.target.value)} />
                <span className="m-2">Até</span>
                <input id="endtDate" className="form-control" type="date" onChange={(e) => setDtEnd(e.target.value)} />
                <div className="form-control ms-1 me-1">                  
                  <select name="tecnico" id="tecnico" value={idTecnico} onChange={(e) => setIdTecnico(e.target.value)}>
                     <option value="">Todos os Técnicos</option>
                    {tecnicos?.map((t) => {
                      return <option key={t.id_tecnico} value={t.id_tecnico}
                      >{t.name}</option>
                    })}
                  </select>
                </div>
                <button onClick={LoadAppointments} className="btn btn-outline-secondary" type="button">
                  Filtrar</button>                
              </div>
            </div>

            {/* Tabela adaptada */}
            <div className="table-responsive shadow-table bd-table">
              <table className="table table-hover rounded">
                <thead className='title-table'>
                  <tr className="border">
                    <th scope="col" className="h5">Cliente</th>
                    <th scope="col" className="h5">Técnico</th>
                    <th scope="col" className="h5">Serviço</th>
                    <th scope="col" className="h5">Data/Hora</th>
                    <th scope="col" className="h5">Estado</th>
                    <th scope="col" className="h5">Preço</th>
                    <th scope="col" className="h5 text-end">Competências</th>
                    <th scope="col" className="col-buttons"></th>
                  </tr>
                </thead>
                <tbody>
                  {appointments?.map((ap) => {
                    return (
                      <Appointment key={ap.id_appointment}
                        id_appointment={ap.id_appointment}
                        service={ap.service}
                        tecnico={ap.tecnico}
                        client={ap.cliente}
                        price={ap.preco}
                        skills={ap.specialty}
                        status={ap.status}
                        booking_date={ap.booking_date}
                        booking_hour={ap.booking_hour}
                        clickEdit={ClickEdit}
                        clickDelete={ClickDelete}
                      />
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Appointments
