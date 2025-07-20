import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Navbar from '../../components/navbar'
import Sidebar from '../../components/sidebar'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'

function Appointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);

  const [idTecnico, setIdTecnico] = useState("");
  const [dtStart, setDtStart] = useState("");
  const [dtEnd, setDtEnd] = useState("");

  const { user } = useAuth();

  return (
    <div className="container-fluid mt-page">
      <ToastContainer
        className='Toastify__toast-body'
        autoClose={5000}
        closeOnClick
        position="top-center" />
      <Navbar />
      <div className="row  justify-content-between">
        <div className="col-1 my-1">
          <Sidebar />
        </div>
        <div className="col-11 my-1">

        </div>
      </div>
    </div>
  )
}

export default Appointments
