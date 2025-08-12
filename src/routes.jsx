import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Routes
import PublicRoute from './context/publicRoute';
import ProtectedRoute from './context/protectedRoute';

// Pages
import SignIn from './pages/signIn';
import Appointments from './pages/appointments';
import TecnicosComponent from './pages/tecnicos';
import AppointmentAdd from './pages/appointment-add/appointment-add';
import TecnicoRegister from './pages/tecnicos/register';
import TecnicosEditComponent from './pages/tecnicos/edit';
import ClientComponent from './pages/clients';
import RegisterClient from './pages/clients/register';
import ClientEditComponent from './pages/clients/edit';


function Rotas() {
    return <BrowserRouter future={{ v7_relativeSplatPath: true  }}>
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/" element={<SignIn />} />
            </Route>
            <Route element={<ProtectedRoute />}>
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/appointments/listar" element={<Appointments />} />
                <Route path="/appointments/add" element={<AppointmentAdd />} />
                <Route path="/appointments/edit/:id_appointment" element={<AppointmentAdd />} />
                <Route path="/appointments/tecnicos" element={<TecnicosComponent />} />
                <Route path="/cadastro/tecnicos" element={<TecnicoRegister />} />
                <Route path="/appointments/clients" element={<ClientComponent />} />
                <Route path="/appointments/clients/:id_client" element={<ClientEditComponent />} />
                <Route path="/cadastro/clients" element={<RegisterClient/>} />
                <Route path="/register/edit/:id_tecnico" element={<TecnicosEditComponent />} />                
            </Route>
        </Routes>
    </BrowserRouter>
}

export default Rotas;
