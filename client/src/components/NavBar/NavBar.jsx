import React, { useContext, useState } from 'react'
import logo from '../../assets/img/f1_logo.png'
import { Login, Register } from '../index'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {

    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [modalType, setModalType] = useState(null);

    const handleToogleModal = (type) => {
        setModalType(type);
        setShow(!show);
    }

    const handleCloseModal = () => setShow(false);

    const {user, logoutUser} = useContext(AuthContext);

    const handleLogout = () => {
        logoutUser();
        navigate('/');
    }

    return (
        <header>
            <h1 className="sr-only">Formula 1 API</h1>
            <nav className="navbar navbar-expand-lg">
                <div className="container container-fluid">
                    <div className="container">
                        <a className="navbar-brand" href="/">
                            <img src={logo} alt="Formula 1 Logo" width="120" height="30" />
                        </a>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-link" href="/equipos">Equipos</a>
                            <a className="nav-link" href="/corredores">Corredores</a>
                            <a className="nav-link" href="/documentacion">Documentación</a>
                            <div className="dropdown">
                                <Button className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    {user ? user.username : 'Usuario'}
                                </Button>
                                <ul className="dropdown-menu">
                                    {user ? (
                                        <li><Button className="dropdown-item" onClick={() => handleLogout()}>Cerrar sesión</Button></li>
                                    ) : 
                                    (
                                    <>
                                    <li><Button className="dropdown-item" onClick={() => handleToogleModal('login')}>Login</Button></li>
                                    <li><Button className="dropdown-item" onClick={() => handleToogleModal('register')}>Register</Button></li>
                                    </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <Modal show={show} onHide={handleCloseModal}>
                {modalType === 'login' ? (
                    <Login handleCloseModal={handleCloseModal} />
                ) : (
                    <Register handleCloseModal={handleCloseModal} />
                )}
            </Modal>
        </header>
    )
}

export { NavBar }
