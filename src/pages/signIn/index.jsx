import './styles.css'
import React, { useState } from 'react'

function SignIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [visible, setVisible] = useState(false);
  return (
    <div className='bg-image container-fluid min-vh-100 d-flex align-items-center justify-content-center'>
      <div className="bg-form p-3">
        <form className="form-signin w-100" style={{ maxWidth: "400px" }}>
          <input
            type="email"
            placeholder="E-mail"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="position-relative">
            <input
              type={visible ? "text" : "password"}
              className="form-control pe-5 mb-3"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i
              className={`bi ${visible ? "bi-eye" : "bi-eye-slash"} position-absolute eye-style`}
              onClick={() => setVisible(!visible)}
            ></i>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn
