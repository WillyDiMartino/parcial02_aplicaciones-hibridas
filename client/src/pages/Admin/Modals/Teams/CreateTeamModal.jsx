import React, { useState, useEffect, useContext } from 'react'
import { Modal, Button, Form, FormGroup } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { AuthContext } from '../../../../context/AuthContext'


const CreateTeamModal = () => {
    const [drivers, setDrivers] = useState([]);
    const { auth } = useContext(AuthContext);

    const fetchDrivers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/corredores', {
                headers: { token: auth },
            });
            setDrivers(response.data);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchDrivers();
    }, []);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            base: '',
            teamChief: '',
            powerUnit: '',
            firstEntry: 0,
            constructorPoints: 0,
            constructorChampionships: 0,
            driverOne: null,
            driverTwo: null,
            logoImg: '',
        },
        mode: "onBlur",
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            const teamData = {
                name: data.name,
                base: data.base,
                teamChief: data.teamChief,
                powerUnit: data.powerUnit,
                firstEntry: Number(data.firstEntry),
                constructorPoints: Number(data.constructorPoints), 
                constructorChampionships: Number(data.constructorChampionships),
                driverOne: data.driverOne || null, 
                driverTwo: data.driverTwo || null,
                logoImg: data.logoImg,
            };
    
            console.log("Datos enviados:", teamData); 
            const response = await axios.post('http://localhost:3000/api/equipos', teamData, {
                headers: { token: auth },
            });
            console.log('Equipo creado:', response.data);
            reset();
            fetchDrivers(); 
        } catch (error) {
            console.error('Error al crear el equipo:', error.response?.data?.message || error.message);
        }
    });
    

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Crear Equipo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="mb-3" controlId="teamName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            {...register('name', {
                                required: 'El nombre del equipo es requerido',
                                minLength: {
                                    value: 3,
                                    message: 'Mínimo 3 caracteres',
                                },
                                maxLength: {
                                    value: 25,
                                    message: 'Máximo 25 caracteres',
                                },
                            })}
                        />
                        {errors.name && <span className="text-danger text-small">{errors.name?.message}</span>}
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="teamBase">
                        <Form.Label>Base</Form.Label>
                        <Form.Control
                            type="text"
                            name="base"
                            {...register('base', {
                                required: 'La base del equipo es requerida',
                                minLength: {
                                    value: 3,
                                    message: 'Mínimo 3 caracteres',
                                },
                                maxLength: {
                                    value: 25,
                                    message: 'Máximo 25 caracteres',
                                },
                            })}
                        />
                        {errors.base && <span className="text-danger text-small">{errors.base?.message}</span>}
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="teamChief">
                        <Form.Label>Jefe de equipo</Form.Label>
                        <Form.Control
                            type="text"
                            name="teamChief"
                            {...register('teamChief', {
                                required: 'El jefe de equipo es requerido',
                                minLength: {
                                    value: 3,
                                    message: 'Mínimo 3 caracteres',
                                },
                                maxLength: {
                                    value: 25,
                                    message: 'Máximo 25 caracteres',
                                },
                            })}
                        />
                        {errors.teamChief && <span className="text-danger text-small">{errors.teamChief?.message}</span>}
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="powerUnit">
                        <Form.Label>Unidad de potencia</Form.Label>
                        <Form.Control
                            type="text"
                            name="powerUnit"
                            {...register('powerUnit', {
                                required: 'La unidad de potencia es requerida',
                                minLength: {
                                    value: 3,
                                    message: 'Mínimo 3 caracteres',
                                },
                                maxLength: {
                                    value: 25,
                                    message: 'Máximo 25 caracteres',
                                },
                            })}
                        />
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="firstEntry">
                        <Form.Label>Año de ingreso</Form.Label>
                        <Form.Control
                            type="number"
                            name="firstEntry"
                            {...register('firstEntry')}
                        />
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="constructorPoints">
                        <Form.Label>Puntos de constructor</Form.Label>
                        <Form.Control
                            type="number"
                            name="constructorPoints"
                            {...register('constructorPoints')}
                        />
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="constructorChampionships">
                        <Form.Label>Campeonatos de constructores</Form.Label>
                        <Form.Control
                            type="number"
                            name="constructorChampionships"
                            {...register('constructorChampionships')}
                        />
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="driverOne">
                        <Form.Label>Primer Piloto</Form.Label>
                        <Form.Control as="select" {...register('driverOne')}>
                            <option value="">Seleccione un piloto</option>
                            {drivers.map((driver) => (
                                <option key={driver._id} value={driver._id}>
                                    {driver.lastname}
                                </option>
                            ))}
                        </Form.Control>
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="driverTwo">
                        <Form.Label>Segundo Piloto</Form.Label>
                        <Form.Control as="select" {...register('driverTwo')}>
                            <option value="">Seleccione un piloto</option>
                            {drivers.map((driver) => (
                                <option key={driver._id} value={driver._id}>
                                    {driver.lastname}
                                </option>
                            ))}
                        </Form.Control>
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="logoImg">
                        <Form.Label>Logo</Form.Label>
                        <Form.Control
                            type="text"
                            name="logoImg"
                            {...register('logoImg', {
                                required: 'El logo es requerido',
                                minLength: {
                                    value: 3,
                                    message: 'Mínimo 3 caracteres',
                                },
                                maxLength: {
                                    value: 25,
                                    message: 'Máximo 25 caracteres',
                                },
                            })}
                        />
                        {errors.logoImg && <span className="text-danger text-small">{errors.logoImg?.message}</span>}
                    </FormGroup>

                    <Button variant="primary" type="submit">
                        Crear
                    </Button>
                </Form>
            </Modal.Body>
        </div>
    )
}

export { CreateTeamModal }
