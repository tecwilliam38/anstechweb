import React from 'react'
import { ToastContainer } from 'react-toastify'
import Navbar from '../../components/navbar'

function Appointments() {
  return (
   <div className="container-fluid mt-page">    
            <ToastContainer
                className='Toastify__toast-body'
                autoClose={5000}
                closeOnClick
                position="top-center" />
                <Navbar/>
      Appointment
    </div>
  )
}

export default Appointments
