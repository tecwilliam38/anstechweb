import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaHome, FaCalendarAlt, FaUser, FaCog, FaDashcube } from 'react-icons/fa';
import { AiOutlineDashboard } from "react-icons/ai";
import { IoGridOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import './style.css';

function Sidebar() {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" >
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a href="#" className="nav-link active" aria-current="page">
                        <FaHome className="icon" />
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link link-dark">
                        <AiOutlineDashboard className="icon" />
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link link-dark">
                        <FaCalendarAlt className="icon" />
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link link-dark">
                        <IoGridOutline className="icon" />
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link link-dark">
                        <FaRegCircleUser className='icon' />
                    </a>
                </li>
            </ul>
        </div>

    );
}

export default Sidebar;