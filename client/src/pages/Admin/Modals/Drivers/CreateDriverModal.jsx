import React, { useEffect, useState, useContext } from 'react';
import { Modal, Button, Form, FormGroup, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { AuthContext } from '../../../../context/AuthContext';

const CreateDriverModal = ({ show, handleClose, onCreated }) => {
  const { auth } = useContext(AuthContext);
  const [teams, setTeams] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      lastname: '',
      team: '',
      number: 0,
      birth: '',
      country: '',
      raceWins: 0,
      podiums: 0,
      points24: 0,
      grandPrixEntered: 0,
      worldChampionships: 0,
    },
    mode: "onBlur"
  });

  const fetchTeams = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/equipos', {
        headers: { token: auth },
      });
      setTeams(response.data);
    } catch (error) {
      console.error("Error al cargar equipos:", error);
    }
  };

  useEffect(() => {
    if (show) {
      fetchTeams();
      reset();
      setImageFile(null);
    }
  }, [show, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      let filename = '';

      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const res = await axios.post('http://localhost:3000/api/corredores/upload/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: auth,
          },
        });

        filename = res.data.filename;
      }

      const driverData = {
        ...data,
        team: data.team || null,
        number: Number(data.number),
        raceWins: Number(data.raceWins),
        podiums: Number(data.podiums),
        points24: Number(data.points24),
        grandPrixEntered: Number(data.grandPrixEntered),
        worldChampionships: Number(data.worldChampionships),
        driverImg: filename,
      };

      await axios.post('http://localhost:3000/api/corredores', driverData, {
        headers: { token: auth },
      });

      onCreated();
      handleClose();
    } catch (error) {
      console.error("Error al crear piloto:", error.response?.data || error.message);
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
        <Modal.Title>Crear Piloto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Row className="gy-3">
            <Col md={6}>
              <FormGroup>
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" {...register('name', { required: true })} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Form.Label>Apellido</Form.Label>
                <Form.Control type="text" {...register('lastname', { required: true })} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Form.Label>Número</Form.Label>
                <Form.Control type="number" {...register('number')} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control type="date" {...register('birth')} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Form.Label>País</Form.Label>
                <Form.Control type="text" {...register('country')} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Form.Label>Equipo</Form.Label>
                <Form.Control as="select" {...register('team')}>
                  <option value="">Sin equipo</option>
                  {teams.map(team => (
                    <option key={team._id} value={team._id}>{team.name}</option>
                  ))}
                </Form.Control>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Form.Label>Victorias</Form.Label>
                <Form.Control type="number" {...register('raceWins')} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Form.Label>Podios</Form.Label>
                <Form.Control type="number" {...register('podiums')} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Form.Label>Puntos</Form.Label>
                <Form.Control type="number" {...register('points24')} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Form.Label>GPs Disputados</Form.Label>
                <Form.Control type="number" {...register('grandPrixEntered')} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Form.Label>Campeonatos</Form.Label>
                <Form.Control type="number" {...register('worldChampionships')} />
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <Form.Label>Imagen del piloto</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              </FormGroup>
            </Col>
            <Col md={12} className="text-end">
              <Button variant="primary" type="submit">Crear</Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export { CreateDriverModal };
