import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Admin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAccess = async () => {
            try {
              const response = await fetch('/admin', {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${Cookies.get('token')}`,
                },
              });
      
              if (response.status === 403) {
                navigate('/');
              }
            } catch (error) {
              console.error('Error al verificar acceso al admin:', error);
              navigate('/');
            }
          };

          checkAccess();
        }, [navigate]);

  return (
    <div>
        <h2>Bienvenido al Administrador</h2>
        <p>Necesita un rol específico para poder ingresar</p>
    </div>
  )
}

export {Admin}