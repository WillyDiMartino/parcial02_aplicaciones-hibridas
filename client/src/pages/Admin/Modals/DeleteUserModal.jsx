import React from 'react';
import { Modal, Button } from 'react-bootstrap';


const DeleteUserModal = ({ showDeleteModal, setShowDeleteModal, selectedUser, handleDeleteUser }) => {
  return (
    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro de que querés eliminar a {selectedUser?.name}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDeleteUser}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { DeleteUserModal };
