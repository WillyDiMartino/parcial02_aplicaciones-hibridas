import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteDriverModal = ({ show, handleClose, driver, onConfirm }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar Piloto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Estás seguro de que querés eliminar a <strong>{driver?.name} {driver?.lastname}</strong>?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="danger" onClick={onConfirm}>Eliminar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export { DeleteDriverModal };
