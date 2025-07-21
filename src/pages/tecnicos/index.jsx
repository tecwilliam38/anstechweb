import React, { useState } from 'react'
import Navbar from '../../components/navbar'
import { useNavigate } from 'react-router-dom';

function TecnicosComponent() {
    const navigate = useNavigate();
    const [tecnicos, setTecnicos] = useState([]);
    const [idTecnico, setIdTecnico] = useState("");
    const [services, setServices] = useState([])

    async function LoadTecnicos() { }


    return (
        <div>
            <Navbar />
            Técnicos
        </div>
    )
}

export default TecnicosComponent
