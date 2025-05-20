import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Form, FormGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { AuthContext } from '../../../../context/AuthContext';

const CreateTeamModal = ({ show, handleClose, onCreated }) => {
    const { auth } = useContext(AuthContext);
    const [drivers, setDrivers] = useState([]);
    const [logoFile, setLogoFile] = useState(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            base: '',
            teamChief: '',
            powerUnit: '',
            firstEntry: 0,
            constructorPoints: 0,
            constructorChampionships: 0,
            driverOne: '',
            driverTwo: '',
        },
        mode: "onBlur",
    });

    const fetchDrivers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/corredores', {
                headers: { token: auth },
            });
            setDrivers(response.data);
        } catch (error) {
            console.error("Error al obtener corredores:", error);
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

            onCreated?.();
            handleClose();
        } catch (error) {
            console.error("Error al crear equipo:", error.response?.data || error.message);
        }
    });

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Crear Equipo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" {...register('name', { required: true })} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Base</Form.Label>
                        <Form.Control type="text" {...register('base', { required: true })} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Jefe de equipo</Form.Label>
                        <Form.Control type="text" {...register('teamChief', { required: true })} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Unidad de potencia</Form.Label>
                        <Form.Control type="text" {...register('powerUnit', { required: true })} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Año de ingreso</Form.Label>
                        <Form.Control type="number" {...register('firstEntry')} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Puntos constructor</Form.Label>
                        <Form.Control type="number" {...register('constructorPoints')} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Campeonatos constructor</Form.Label>
                        <Form.Control type="number" {...register('constructorChampionships')} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Piloto 1</Form.Label>
                        <Form.Control as="select" {...register('driverOne')}>
                            <option value="">Sin piloto</option>
                            {drivers.map(driver => (
                                <option key={driver._id} value={driver._id}>
                                    {driver.lastname}
                                </option>
                            ))}
                        </Form.Control>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Piloto 2</Form.Label>
                        <Form.Control as="select" {...register('driverTwo')}>
                            <option value="">Sin piloto</option>
                            {drivers.map(driver => (
                                <option key={driver._id} value={driver._id}>
                                    {driver.lastname}
                                </option>
                            ))}
                        </Form.Control>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Logo del equipo</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(e) => setLogoFile(e.target.files[0])}
                        />
                    </FormGroup>
                    <Button variant="primary" type="submit">Crear</Button>
                </Form>
            </Modal.Body>
        </div>
    );
};

export { CreateTeamModal };
