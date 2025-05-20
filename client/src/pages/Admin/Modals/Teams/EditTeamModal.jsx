import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Form, FormGroup } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { AuthContext } from '../../../../context/AuthContext';

const EditTeamModal = ({ show, handleClose, team, onUpdate }) => {
    const { auth } = useContext(AuthContext);
    const [drivers, setDrivers] = useState([]);
    const [logoFile, setLogoFile] = useState(null);

    const { register, handleSubmit, reset, control } = useForm();

    useEffect(() => {
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

        if (show) fetchDrivers();
    }, [show, auth]);

    useEffect(() => {
        if (team && show) {
            reset({
                name: team.name || '',
                base: team.base || '',
                teamChief: team.teamChief || '',
                powerUnit: team.powerUnit || '',
                firstEntry: team.firstEntry || 0,
                constructorPoints: team.constructorPoints || 0,
                constructorChampionships: team.constructorChampionships || 0,
                driverOne: team.driverOne?._id || '',
                driverTwo: team.driverTwo?._id || '',
            });
            setLogoFile(null);
        }
    }, [team, show, reset]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            let filename = team.logoImg;

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

            const updatedData = {
                ...data,
                firstEntry: Number(data.firstEntry),
                constructorPoints: Number(data.constructorPoints),
                constructorChampionships: Number(data.constructorChampionships),
                driverOne: data.driverOne || null,
                driverTwo: data.driverTwo || null,
                logoImg: filename,
            };

            await axios.put(`http://localhost:3000/api/equipos/${team._id}`, updatedData, {
                headers: { token: auth },
            });

            onUpdate();
            handleClose();
        } catch (error) {
            console.error("Error al editar equipo:", error.response?.data || error.message);
        }
    });

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Equipo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" {...register('name')} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Base</Form.Label>
                        <Form.Control type="text" {...register('base')} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Jefe de equipo</Form.Label>
                        <Form.Control type="text" {...register('teamChief')} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Unidad de potencia</Form.Label>
                        <Form.Control type="text" {...register('powerUnit')} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Año de ingreso</Form.Label>
                        <Form.Control type="number" {...register('firstEntry')} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Puntos</Form.Label>
                        <Form.Control type="number" {...register('constructorPoints')} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Campeonatos</Form.Label>
                        <Form.Control type="number" {...register('constructorChampionships')} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Piloto 1</Form.Label>
                        <Controller
                            name="driverOne"
                            control={control}
                            render={({ field }) => (
                                <Form.Control as="select" {...field}>
                                    <option value="">Sin piloto</option>
                                    {drivers.map(driver => (
                                        <option key={driver._id} value={driver._id}>{driver.lastname}</option>
                                    ))}
                                </Form.Control>
                            )}
                        />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Piloto 2</Form.Label>
                        <Controller
                            name="driverTwo"
                            control={control}
                            render={({ field }) => (
                                <Form.Control as="select" {...field}>
                                    <option value="">Sin piloto</option>
                                    {drivers.map(driver => (
                                        <option key={driver._id} value={driver._id}>{driver.lastname}</option>
                                    ))}
                                </Form.Control>
                            )}
                        />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Logo actual</Form.Label>
                        <div className="text-muted mb-2">{team.logoImg}</div>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(e) => setLogoFile(e.target.files[0])}
                        />
                    </FormGroup>
                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={handleClose} className="me-2">Cancelar</Button>
                        <Button variant="primary" type="submit">Guardar</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export { EditTeamModal };
