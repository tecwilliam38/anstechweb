import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import iconLogo from "../../assets/iconlogo.png"
import { useAuth } from "../../context/authContext";


function Navbar() {

    const navigate = useNavigate();
    const { logout, user } = useAuth();

    function Logout() {
        logout();
        navigate("/");
    }

    return <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-navbar bg-primary" data-bs-theme="dark">
        <Link className="navbar-brand" to="/appointments">
            <img className="navbar-logo" src={iconLogo} />
        </Link>
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                </ul>
                <ul className="navbar-nav ">
                    <li className="nav-item">
                        <div className="btn-group menu-name">
                            <button type="button" className="btn btn-outline-dark dropdown-toggle menu-name" data-bs-toggle="dropdown" aria-expanded="false">
                                {user.name}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li className="nav-item menu-name">
                                    <Link className="nav-link" to="/appointments/tecnicos">Técnicos</Link>
                                </li>
                                <li className="nav-item menu-name">
                                    <Link className="nav-link" to="/appointments/clients">Clientes</Link>
                                </li>
                                <li className="nav-item menu-name"><Link className="nav-link" to="/admin/profile">Meu Perfil</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li className="nav-item menu-name"><button className="dropdown-item menu-name" onClick={Logout}>Desconectar</button></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    </nav>
}

export default Navbar;