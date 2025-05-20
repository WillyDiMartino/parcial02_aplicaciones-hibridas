import React, { useEffect, useState, useContext } from 'react';
import { Modal, Button, Form, FormGroup } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { AuthContext } from '../../../../context/AuthContext';

const EditDriverModal = ({ show, handleClose, driver, onUpdated }) => {
    const { auth } = useContext(AuthContext);
    const [teams, setTeams] = useState([]);
    const [imageFile, setImageFile] = useState(null);

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
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
    });

    useEffect(() => {
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

        if (show) fetchTeams();
    }, [show, auth]);

    useEffect(() => {
        if (driver && show) {
            reset({
                name: driver.name || '',
                lastname: driver.lastname || '',
                team: driver.team?._id || '',
                number: driver.number || 0,
                birth: driver.birth?.slice(0, 10) || '',
                country: driver.country || '',
                raceWins: driver.raceWins || 0,
                podiums: driver.podiums || 0,
                points24: driver.points24 || 0,
                grandPrixEntered: driver.grandPrixEntered || 0,
                worldChampionships: driver.worldChampionships || 0,
            });
            setImageFile(null);
        }
    }, [driver, show, reset]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            let filename = driver.driverImg; 

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

            const updatedData = {
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

            await axios.put(`http://localhost:3000/api/corredores/${driver._id}`, updatedData, {
                headers: { token: auth },
            });

            onUpdated();
            handleClose();
        } catch (error) {
            console.error("Error al editar piloto:", error.response?.data || error.message);
        }
    });

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Piloto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" {...register('name', { required: true })} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control type="text" {...register('lastname', { required: true })} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Número</Form.Label>
                        <Form.Control type="number" {...register('number')} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Fecha de nacimiento</Form.Label>
                        <Form.Control type="date" {...register('birth')} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>País</Form.Label>
                        <Form.Control type="text" {...register('country')} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Victorias</Form.Label>
                        <Form.Control type="number" {...register('raceWins')} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Podios</Form.Label>
                        <Form.Control type="number" {...register('podiums')} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Puntos 2024</Form.Label>
                        <Form.Control type="number" {...register('points24')} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>GPs Disputados</Form.Label>
                        <Form.Control type="number" {...register('grandPrixEntered')} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Campeonatos</Form.Label>
                        <Form.Control type="number" {...register('worldChampionships')} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Imagen actual</Form.Label>
                        <div className="text-muted mb-2">{driver.driverImg}</div>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files[0])}
                        />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Equipo</Form.Label>
                        <Controller
                            name="team"
                            control={control}
                            render={({ field }) => (
                                <Form.Control as="select" {...field}>
                                    <option value="">Sin equipo</option>
                                    {teams.map(team => (
                                        <option key={team._id} value={team._id}>{team.name}</option>
                                    ))}
                                </Form.Control>
                            )}
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

export { EditDriverModal };
