import React, { useContext } from 'react';
import logo from '../../assets/img/f1_logo.png';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Footer = () => {
    const { user } = useContext(AuthContext);
    return (
        <footer>
            <div className="d-flex justify-content-around align-items-center">
                <Link href="/"><img src={logo} alt="logo formula 1" width="120" height="30" /></Link>
                {(user?.role === 'admin' || user?.role === 'super-admin') && (
                    <Link to="/admin" className="admin-link">Administración</Link>
                )}
                <ul>
                    <span>Alumnos:</span>
                    <li>Guillermo Di Martino</li>
                    <li>Tomás Paravic</li>
                </ul>
                <ul>
                    <span>Profesora:</span>
                    <li>Camila Belén Márcos Galbán</li>
                </ul>
                <ul>
                    <span>Materia:</span>
                    <li>Aplicaciones Híbridas</li>
                    <span>Comisión:</span>
                    <li>DWN4AV</li>
                </ul>
            </div>

            <p>&copy; 2021 Formula 1 API - Di Martino - Paravic</p>
        </footer>
    );
}

export { Footer };
