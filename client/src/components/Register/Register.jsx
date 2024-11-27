import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ handleCloseModal }) => {
  const [userData, setUserData] = useState({
    name: '',
    lastname: '',
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/usuarios', userData);
      setUserData({
        name: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
      });
      handleCloseModal();
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Ocurrió un error");
    }
  };

  return (
    <div>
      <h2>Registrate</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className="form-control"
            id="name"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Apellido</label>
          <input
            type="text"
            value={userData.lastname}
            onChange={(e) => setUserData({ ...userData, lastname: e.target.value })}
            className="form-control"
            id="lastname"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nombre de usuario</label>
          <input
            type="text"
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            className="form-control"
            id="username"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            className="form-control"
            id="email"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            className="form-control"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Registrarse
        </button>
        {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}
      </form>
    </div>
  );
};

export { Register };
