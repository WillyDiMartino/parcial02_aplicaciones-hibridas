import React, {useState, useEffect} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'

const EditUserModal = ({show, onHide, user, onSave}) => {
    const [formData, setFormData] = useState({name: '', lastname: '' ,username: '', email: '', role: ''});
    useEffect(()=> {
        if (user){
            setFormData({
                id: user._id,
                name: user.name || '',
                lastname: user.lastname || '',
                username: user.username || '',
                email: user.email || '',
                role: user.role || 'user',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
    }));
    };

    const handleSubmit = () => {
        onSave(formData);
        onHide();
    };

  return (
      <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="userName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="userLastname">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="userUsername">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="userEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="userRole">
            <Form.Label>Rol</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export {EditUserModal}