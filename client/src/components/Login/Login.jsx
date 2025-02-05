import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import Cookies from 'js-cookie';

const Login = ({ handleCloseModal }) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { setUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/usuarios/login', userData);
      setUser(res.data.user);
      Cookies.set('token', res.data.token, { expires: 3 });
      setUserData({ email: '', password: '' });
      handleCloseModal();
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || 'Error al iniciar sesión.');
    }
  };

  return (
    <div>
        <button className="close-btn" onClick={handleCloseModal}>
          &times;
        </button>
        <h2 className="modal-title">Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              className="form-control"
              placeholder="Ingrese su email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              className="form-control"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>
          <button type="submit" className="btn custom-btn w-100">
            Ingresar
          </button>
          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
        </form>
    </div>
  );
};

export { Login };
