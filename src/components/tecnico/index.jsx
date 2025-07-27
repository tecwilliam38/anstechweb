import PropTypes from 'prop-types'
import React from 'react'


Tecnico.propTypes = {
    name:PropTypes.string,
    endereco:PropTypes.string,
    cel_phone:PropTypes.string,
    email:PropTypes.string,
    specialty:PropTypes.string,
    password:PropTypes.string,
    clickEdit: PropTypes.func,
    clickDelete: PropTypes.func,
    id_tecnico: PropTypes.number,
}


function Tecnico(props) {
    
    return<>
             <section className="col-12 border bg-form my-2 px-2" key={props.id_tecnico}>
                                            <div className="row card-title ps-4 py-2 h4 text-light">{props.name}</div>
                                            <div className="row">
                                                <div className="col-3">
                                                    <dt className='p-2'>👤 Email</dt>
                                                    <div className="border p-2">
                                                        {props.email}
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <dt className='p-2'>👤 Endereço</dt>
                                                    <div className="border p-2">
                                                        {props.endereco}
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <dt className='p-2'>👤 Celular</dt>
                                                    <div className="border p-2">
                                                        {props.cel_phone}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row justify-content-between pb-3">
                                                <div className="col-3">
                                                    <dt className='p-2'>👤 Função</dt>
                                                    <div className="border p-2">
                                                        {props.skill}
                                                    </div>
                                                </div>
                                                {/* <div className="col-6">
                                                    <dt className='p-2'>👤 Atividades</dt>
                                                    {services?.map((s) => {
                                                        return <div className='border' key={s.id_service} value={s.id_service}>
                                                            {s.description}
                                                        </div>
                                                    })}
                                                </div> */}
                                                <div className="col-3 d-flex align-items-end justify-content-end">
                                                    <div className="justify-content-around me-3">
                                                        <button onClick={() => props.ClickEdit(props.id_tecnico)}
                                                            className="btn btn-sm btn-primary mx-2">
                                                            <i className="bi bi-pencil-square"></i>
                                                        </button>
                                                        <button onClick={() => props.ClickDelete(props.id_tecnico)}
                                                            className="btn btn-sm btn-danger">
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </section >
        </>    
}

export default Tecnico;
    // return (<>
    //     <tr>
    //         <td>{props.client}</td>
    //         <td>{props.tecnico}</td>
    //         <td>{props.service}</td>
    //         <td>{new Intl.DateTimeFormat("pt-br", { dataStyle: "short" }).format(dt)}-{props.booking_hour}h</td>
    //         <td>{props.status}</td>
    //         <td>{preco}</td>
    //         <td className="text-end">{props.skills}</td>
    //         <td className="text-end justify-content-between">
    //             <button onClick={() => props.clickEdit(props.id_appointment)}
    //                 className="btn btn-sm btn-primary my-2">
    //                 <i className="bi bi-pencil-square"></i>
    //             </button>
    //             <button onClick={() => props.clickDelete(props.id_appointment)}
    //                 className="btn btn-sm btn-danger">
    //                 <i className="bi bi-trash"></i>
    //             </button>
    //         </td>
    //     </tr>
    // </>
