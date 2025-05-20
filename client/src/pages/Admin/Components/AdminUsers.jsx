import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthContext';
import { EditUserModal } from '../Modals/EditUserModal';
import { DeleteUserModal } from '../Modals/DeleteUserModal';
import { Register } from '../../../components';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { auth } = useContext(AuthContext);

  const handleCloseModal = () => setShow(false);

  const handleToogleModal = (action) => {
    if (action === 'register') {
      setShow(true);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/usuarios', {
        headers: { token: auth },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const handleEditUser = async (updatedUser) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/usuarios/${updatedUser.id}`,
        updatedUser,
        {
          headers: {
            token: auth,
          },
        }
      );
      if (response.status === 200) {
        fetchUsers();
      } else {
        console.error('Error al actualizar el usuario');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser?._id) {
      console.error("No se encontró el ID del usuario.");
      return;
    }

    if (!auth) {
      console.error("No se encontró el token de autenticación.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:3000/usuarios/${selectedUser._id}`,
        {
          headers: { token: auth },
        }
      );

      if (response.status === 200) {
        console.log(`Usuario ${selectedUser.name} eliminado`);
        fetchUsers();
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error.response ? error.response.data : error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  return (
    <div className="mt-4">
      <h3 className="text-center mb-4">Gestión de Usuarios</h3>

      <Button 
        variant="primary" 
        className="mb-3 btn-custom"
        onClick={() => handleToogleModal('register')}
      >
        Crear Usuario
      </Button>

      <table className="table table-striped table-custom">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id || index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button
                  className="btn-edit me-2"
                  size="sm"
                  onClick={() => {
                    setSelectedUser(user);
                    setShowEditModal(true);
                  }}
                >
                  Editar
                </Button>
                <Button
                  className="btn-delete"
                  size="sm"
                  onClick={() => handleOpenDeleteModal(user)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={show} onHide={handleCloseModal}>
        <Register handleCloseModal={handleCloseModal} />
      </Modal>

      <EditUserModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        user={selectedUser}
        onSave={handleEditUser}
      />

      <DeleteUserModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        selectedUser={selectedUser}
        handleDeleteUser={handleDeleteUser}
      />
    </div>
  );
};

export { AdminUsers };
