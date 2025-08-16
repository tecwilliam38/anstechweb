import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import api from '../../api/api';
import Navbar from '../../components/navbar';
import { ToastContainer } from 'react-toastify';

export default function ProfileScreen() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState(null);
  const userAdmin = user.id_admin

  useEffect(() => {
    const LoadAdmin = async () => {
      try {
        const response = await api.get(`/admin/profile/${userAdmin}`);
        if (response?.data) {
          setAdminData(response.data);          
        } else {
          console.warn('Resposta sem dados.');
        }
      } catch (err) {
        console.error('Erro ao buscar perfil:', err);
      }
    };

    if (userAdmin) {
      LoadAdmin();
    }


  }, [userAdmin])

  return (
    <>
      <div className="container-fluid mt-add">
        <ToastContainer
          className='Toastify__toast-body'
          autoClose={2000}
          closeOnClick
          position="top-center" />
        <Navbar />
        <div className="container col-10">
          <div className="row justify-content-between">
            <div className="h1 col-auto">
              Dados de Administrador
            </div>
            {/* <button
                            onClick={() => navigate("/cadastro/tecnicos")}
                            className="btn me-2 col-3 btn-primary  button-login">Cadastrar novo Técnico</button> */}
          </div>
        </div>
        <div className="container-fluid ">
          <div className="row d-flex justify-content-center  mb-1">
            <div className="col-10 mx-auto">
              {adminData ?
                <>
                  <div className="card my-3 bg-form text-light">
                    <div className="ps-4 py-2 card-title h4">
                      {adminData.nome}
                    </div>

                    <div className="card-body">
                      <div className="row justify-content-between mb-3 mx-3">
                        <div className="col-md-auto text-dark">
                          <div>👤 Email</div>
                          <div className="border p-2 bg-light text-dark rounded">
                            {adminData.email}
                          </div>
                        </div>

                        <div className="col-md-auto text-dark">
                          <div>📱 Celular</div>
                          <div className="border p-2 bg-light text-dark rounded">
                            {adminData.telefone}
                          </div>
                        </div>
                        <div className="col-md-3 d-flex align-items-end justify-content-end">
                          <button
                            // onClick={() => ClickEdit(tec.id_tecnico)}
                            className="btn btn-sm btn-primary mx-2"
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            // onClick={() => ClickDelete(tec.id_tecnico)}
                            className="btn btn-sm btn-danger"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>

                      <div className="row justify-content-between">

                      </div>
                    </div>
                  </div>
                </>
                :
                <>
                  <p>Carregando...</p>
                </>}
            </div>
          </div>
        </div >
      </div >
    </>

  )
}
