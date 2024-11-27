import React from 'react'
import {useCheckAccess} from '../../hooks/useCheckAccess';
import { AdminUsers } from './Components/AdminUsers';

const Admin = () => {
    useCheckAccess('/admin');

  return (
    <div>
        <h2>Bienvenido al Administrador</h2>
        <AdminUsers />  
    </div>
  )
}

export {Admin}