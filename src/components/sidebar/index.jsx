import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import './style.css';

function Sidebar() {
  return (
   <div className="sidebar">
      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link href="/home">
          <FaHome className="icon" /> Home
        </Nav.Link>
        <Nav.Link href="/profile">
          <FaUser className="icon" /> Perfil
        </Nav.Link>
        <Nav.Link href="/settings">
          <FaCog className="icon" /> Configurações
        </Nav.Link>
      </Nav>
    </div>

  );
}

export default Sidebar;