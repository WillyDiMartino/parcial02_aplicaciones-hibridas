import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Form, FormGroup, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { AuthContext } from '../../../../context/AuthContext';

const CreateTeamModal = ({ show, handleClose, onCreated }) => {
  const { auth } = useContext(AuthContext);
  const [drivers, setDrivers] = useState([]);
  const [logoFile, setLogoFile] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const fetchDrivers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/corredores', {
        headers: { token: auth },
      });
      setDrivers(res.data);
    } catch (error) {
      console.error('Error al obtener corredores:', error);
    }
  };

  useEffect(() => {
    if (show) {
      fetchDrivers();
      reset();
      setLogoFile(null);
    }
  }, [show, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      let filename = '';

      if (logoFile) {
        const formData = new FormData();
        formData.append('image', logoFile);

        const res = await axios.post('http://localhost:3000/api/equipos/upload/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: auth,
          },
        });

        filename = res.data.filename;
      }

      const teamData = {
        ...data,
        firstEntry: Number(data.firstEntry),
        constructorPoints: Number(data.constructorPoints),
        constructorChampionships: Number(data.constructorChampionships),
        driverOne: data.driverOne || null,
        driverTwo: data.driverTwo || null,
        logoImg: filename,
      };

      await axios.post('http://localhost:3000/api/equipos', teamData, {
        headers: { token: auth },
      });

      onCreated();
      handleClose();
    } catch (error) {
      console.error("Error al crear equipo:", error.response?.data || error.message);
    }
  });

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="lg"
      backdrop="static"
      dialogClassName="custom-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Crear Equipo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Row className="gy-3">
            <Col md={6}><FormGroup><Form.Label>Nombre</Form.Label><Form.Control type="text" {...register('name')} /></FormGroup></Col>
            <Col md={6}><FormGroup><Form.Label>Base</Form.Label><Form.Control type="text" {...register('base')} /></FormGroup></Col>
            <Col md={6}><FormGroup><Form.Label>Jefe de equipo</Form.Label><Form.Control type="text" {...register('teamChief')} /></FormGroup></Col>
            <Col md={6}><FormGroup><Form.Label>Unidad de potencia</Form.Label><Form.Control type="text" {...register('powerUnit')} /></FormGroup></Col>
            <Col md={6}><FormGroup><Form.Label>Año de ingreso</Form.Label><Form.Control type="number" {...register('firstEntry')} /></FormGroup></Col>
            <Col md={6}><FormGroup><Form.Label>Puntos constructor</Form.Label><Form.Control type="number" {...register('constructorPoints')} /></FormGroup></Col>
            <Col md={12}><FormGroup><Form.Label>Campeonatos constructores</Form.Label><Form.Control type="number" {...register('constructorChampionships')} /></FormGroup></Col>
            <Col md={6}><FormGroup><Form.Label>Piloto 1</Form.Label><Form.Control as="select" {...register('driverOne')}><option value="">Sin piloto</option>{drivers.map(d => <option key={d._id} value={d._id}>{d.lastname}</option>)}</Form.Control></FormGroup></Col>
            <Col md={6}><FormGroup><Form.Label>Piloto 2</Form.Label><Form.Control as="select" {...register('driverTwo')}><option value="">Sin piloto</option>{drivers.map(d => <option key={d._id} value={d._id}>{d.lastname}</option>)}</Form.Control></FormGroup></Col>
            <Col md={12}><FormGroup><Form.Label>Logo del equipo</Form.Label><Form.Control type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files[0])} /></FormGroup></Col>
            <Col md={12} className="text-end"><Button variant="primary" type="submit">Crear</Button></Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export { CreateTeamModal };
