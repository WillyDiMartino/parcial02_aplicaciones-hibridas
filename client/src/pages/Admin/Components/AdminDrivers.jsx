import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthContext';
import { CreateDriverModal } from '../Modals/Drivers/CreateDriverModal';
import { EditDriverModal } from '../Modals/Drivers/EditDriverModal';
import { DeleteDriverModal } from '../Modals/Drivers/DeleteDriverModal';


const AdminDrivers = () => {
    const { auth } = useContext(AuthContext);
    const [drivers, setDrivers] = useState([]);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [driverToEdit, setDriverToEdit] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [driverToDelete, setDriverToDelete] = useState(null);

    const handleToggleCreateModal = () => setShowCreateModal(!showCreateModal);

    const handleOpenEditModal = (driver) => {
        setDriverToEdit(driver);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setDriverToEdit(null);
        setShowEditModal(false);
    };

    const handleOpenDeleteModal = (driver) => {
        setDriverToDelete(driver);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setDriverToDelete(null);
        setShowDeleteModal(false);
    };

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

    const handleDeleteDriver = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/corredores/${driverToDelete._id}`, {
                headers: { token: auth },
            });
            fetchDrivers();
            handleCloseDeleteModal();
        } catch (error) {
            console.error("Error al eliminar piloto:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchDrivers();
    }, []);

    return (
        <div className='mt-4'>
            <h3 className='text-center mb-4'>Gestión de Pilotos</h3>
            <Button className='mb-3 btn-custom' onClick={handleToggleCreateModal}>Crear Piloto</Button>

            <table className="table table-striped table-custom">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Equipo</th>
                        <th>Número</th>
                        <th>País</th>
                        <th>Nacimiento</th>
                        <th>Victorias</th>
                        <th>Podios</th>
                        <th>Puntos 2024</th>
                        <th>GPs</th>
                        <th>Campeonatos</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.map((driver) => (
                        <tr key={driver._id}>
                            <td>{driver.name}</td>
                            <td>{driver.lastname}</td>
                            <td>{driver.team?.name || '-'}</td>
                            <td>{driver.number}</td>
                            <td>{driver.country}</td>
                            <td>{new Date(driver.birth).toLocaleDateString()}</td>
                            <td>{driver.raceWins}</td>
                            <td>{driver.podiums}</td>
                            <td>{driver.points24}</td>
                            <td>{driver.grandPrixEntered}</td>
                            <td>{driver.worldChampionships}</td>
                            <td>{driver.driverImg}</td>
                            <td>
                                <Button className='btn-edit me-2' onClick={() => handleOpenEditModal(driver)}>Editar</Button>
                                <Button className='btn-delete' onClick={() => handleOpenDeleteModal(driver)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {}
            <CreateDriverModal
                show={showCreateModal}
                handleClose={handleToggleCreateModal}
                onCreated={fetchDrivers}
            />

            {showEditModal && (
                <EditDriverModal
                    show={showEditModal}
                    handleClose={handleCloseEditModal}
                    driver={driverToEdit}
                    onUpdated={fetchDrivers}
                />
            )}

            <DeleteDriverModal
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                driver={driverToDelete}
                onConfirm={handleDeleteDriver}
            />
        </div>
    );
};

export { AdminDrivers };
