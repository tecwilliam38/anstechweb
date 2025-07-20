import './styles.css'
import React, { useState } from 'react'
import iconLogo from "../../assets/logoLogin.png"

function SignIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [visible, setVisible] = useState(false);

  async function HandleLogin(){
    alert("Logou")
  }

  return (
    <div className='bg-image container-fluid min-vh-100 d-flex align-items-center justify-content-center'>
      <div className="bg-form p-3">
        <div className="logo-signin mb-4"></div>
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
            <button
                            onClick={HandleLogin}
                            className="btn btn-primary w-100 button-login p-2"
                            type="button"
                        >
                            Login
                        </button>
        </form>
      </div>
    </div>
  )
}

export default SignIn
