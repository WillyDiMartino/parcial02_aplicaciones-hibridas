import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import Cookies from 'js-cookie';

const Login = ({handleCloseModal}) => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState("");

  const  {setUser} = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/usuarios/login', userData)
    .then((res) => {
      setUser(res.data.user);
      Cookies.set('token', res.data.token, {expires: 3});
      setUserData({email: '', password: ''});
      handleCloseModal();
    })
    .catch((error) => {
      console.log(error);
      setError(error.response.data.message);
    })
  }

  return (
    <div>
    <h2>Iniciar Sesión</h2>
      <form>
        <div className="mb-3">
        <label className="form-label">Email</label>
          <input type="email" value={userData.email} onChange={(e) => setUserData({...userData, email:e.target.value})} className="form-control" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
        <label className="form-label">Contraseña</label>
          <input type="password" value={userData.password} onChange={(e) => setUserData({...userData, password:e.target.value})} className="form-control" />
        </div>
        <button onClick={handleLogin} className="btn btn-primary" >Ingresar</button>
        {
          error && <div className="alert alert-danger mt-3" role="alert">{error}</div>
        }
      </form>
    </div>
  )
}

export { Login }