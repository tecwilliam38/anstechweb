import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublicRoute from './context/publicRoute';
import SignIn from './pages/signIn';

function Rotas() {
    return <BrowserRouter future={{ v7_startTransition: true }}>
        <Routes>
            <Route element={<PublicRoute/>}>
                <Route path="/" element={<SignIn />} />
            </Route>
        </Routes>
    </BrowserRouter>    
}

export default Rotas;
