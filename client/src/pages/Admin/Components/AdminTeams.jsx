import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthContext';
import { CreateTeamModal } from '../Modals/Teams/CreateTeamModal';
import { EditTeamModal } from '../Modals/Teams/EditTeamModal';
import { DeleteTeamModal } from '../Modals/Teams/DeleteTeamModal';

const AdminTeams = () => {
    const { auth } = useContext(AuthContext);
    const [teams, setTeams] = useState([]);

    const [show, setShow] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [teamToDelete, setTeamToDelete] = useState(null);

    const handleToogleModal = () => setShow(!show);

    const handleOpenEditModal = (team) => {
        setSelectedTeam(team);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setSelectedTeam(null);
        setShowEditModal(false);
    };

    const handleOpenDeleteModal = (team) => {
        setTeamToDelete(team);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setTeamToDelete(null);
        setShowDeleteModal(false);
    };

    const handleDeleteTeam = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/equipos/${teamToDelete._id}`, {
                headers: { token: auth },
            });
            fetchTeams();
            handleCloseDeleteModal();
        } catch (error) {
            console.error("Error al eliminar el equipo:", error.response?.data || error.message);
        }
    };

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
                        <tr key={team._id || index}>
                            <td>{team.name}</td>
                            <td>{team.base}</td>
                            <td>{team.teamChief}</td>
                            <td>{team.powerUnit}</td>
                            <td>{team.firstEntry}</td>
                            <td>{team.constructorPoints}</td>
                            <td>{team.constructorChampionships}</td>
                            <td>{team.driverOne?.lastname || '-'}</td>
                            <td>{team.driverTwo?.lastname || '-'}</td>
                            <td>{team.logoImg}</td>
                            <td>
                                <Button className='btn-edit me-2' onClick={() => handleOpenEditModal(team)}>Editar</Button>
                                <Button className='btn-delete' onClick={() => handleOpenDeleteModal(team)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {}
            {show && <CreateTeamModal show={show} handleClose={handleToogleModal} />}
            {showEditModal && (
                <EditTeamModal
                    team={selectedTeam}
                    show={showEditModal}
                    handleClose={handleCloseEditModal}
                    onUpdate={fetchTeams}
                />
            )}
            <DeleteTeamModal
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                team={teamToDelete}
                onConfirm={handleDeleteTeam}
            />
        </div>
    );
};

export { AdminTeams };
