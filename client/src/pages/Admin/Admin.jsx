import React from 'react';
import { useCheckAccess } from '../../hooks/useCheckAccess';
import { AdminUsers } from './Components/AdminUsers';

const Admin = () => {
  useCheckAccess('/admin');

  return (
    <div>
      <div className="admin-title-container">
        <h2 className="admin-title">Bienvenido al Administrador</h2>
      </div>
      <AdminUsers />  
    </div>
  );
}

export { Admin };
