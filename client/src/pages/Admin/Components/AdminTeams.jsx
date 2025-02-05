import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthContext';
import { CreateTeamModal } from '../Modals/Teams/CreateTeamModal';

const AdminTeams = () => {
    const [teams, setTeams] = useState([]);
    const { auth } = useContext(AuthContext);
    const [show, setShow] = useState(false);

    const handleToogleModal = () => setShow(!show);

    const fetchTeams = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/equipos', {
                headers: { token: auth },
            });

            setTeams(response.data);
        } catch (error) {
            console.error('Error al obtener equipos:', error);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    return (
        <div className='mt-4'>
            <h3 className='text-center mb-4'>Gestión de Equipos</h3>
            <Button className='mb-3 btn-custom' onClick={handleToogleModal}>Crear Equipo</Button>

            <table className="table table-striped table-custom">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Base</th>
                        <th>Jefe</th>
                        <th>Motor</th>
                        <th>Ingreso</th>
                        <th>Puntos de constructor</th>
                        <th>Campeonatos de constructor</th>
                        <th>Corredor 1</th>
                        <th>Corredor 2</th>
                        <th>Logo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team, index) => (
                        <tr key={team.id || index}>
                            <td>{team.name}</td>
                            <td>{team.base}</td>
                            <td>{team.teamChief}</td>
                            <td>{team.powerUnit}</td>
                            <td>{team.firstEntry}</td>
                            <td>{team.constructorPoints}</td>
                            <td>{team.constructorChampionships}</td>
                            <td>{team.driverOne.lastname}</td>
                            <td>{team.driverTwo.lastname}</td>
                            <td>{team.logo}</td>
                            <td>
                                <Button className='btn-edit me-2'>Editar</Button>
                                <Button className='btn-delete' onClick={() => handleOpenDeleteModal(team)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={show} onHide={handleToogleModal}>
                <CreateTeamModal show={show} handleClose={handleToogleModal} />
            </Modal>

        </div>
    )
}

export { AdminTeams }
