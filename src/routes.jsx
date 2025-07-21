import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Routes
import PublicRoute from './context/publicRoute';
import ProtectedRoute from './context/protectedRoute';

// Pages
import SignIn from './pages/signIn';
import Appointments from './pages/appointments';
import TecnicosComponent from './pages/tecnicos';
import RegisterTecnicoComponent from './pages/register';


function Rotas() {
    return <BrowserRouter future={{ v7_relativeSplatPath: true  }}>
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/" element={<SignIn />} />
            </Route>
            <Route element={<ProtectedRoute />}>
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/appointments/tecnicos" element={<TecnicosComponent />} />
                <Route path="/cadastro/tecnicos" element={<RegisterTecnicoComponent />} />
                <Route path="/register/edit/:id_tecnico" element={<RegisterTecnicoComponent />} />                
            </Route>
        </Routes>
    </BrowserRouter>
}

export default Rotas;
